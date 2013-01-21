var _intervalUpdateState;
var GameState = {
    grid: undefined,
    locs: undefined,
    owners: undefined,
    start_time: undefined,
    time_left: undefined,
    units: undefined,
    HPs: undefined,
    whose_action: undefined,
    player: "",
    action_count: 1,
    ply_no: 1,
    turn_no: 1,
    myUnits: undefined,
    theirUnits: undefined,
    battlefield: undefined,
    last_result: { num: 0 },
    last_last_result: { num: 0 },

    //This init function is bad, it should check the current state AND initial_state.
    init: function(cb) {
        // get username
        var getUsername = battleService.get_username();
        getUsername.then(function(username) {
            GameState.player = username;
            
            // get initial state
            var getInitialState = battleService.initial_state();
            getInitialState.then(function(res) {
                var state = res.initial_state;
                GameState.grid = state.grid.grid;
                GameState.locs = state.init_locs;
                GameState.owners = state.owners;
                GameState.start_time = state.start_time;
                GameState.units = state.units;
                GameState.player_names = state.player_names;
                GameState.whose_action = GameState.player_names[0];
                GameState.HPs = [];
                
                for (var ID in GameState.units) {
                    
                    //TODO Calculate HPs
                    GameState.HPs[ID] = 0;  
                    
                    // make 'grid' and 'units' scients homologous and attach their ID's
                    var scient = GameState.units[ID].scient;
                    scient.ID = ID;
                    var x = scient.location[0];
                    var y = scient.location[1];
                    GameState.grid.tiles[x][y].tile.contents.scient = scient;
                }
                
                // create the battlefield
                GameState.battlefield = new Battlefield(GameState.grid, GameState.locs, GameState.owners);
                cb();
            });
        });
    },
    
    update: function() {
        var response = battleService.last_result();
        response.then(GameState.processActionResult);
        
        var get_timeLeft = battleService.time_left();
        get_timeLeft.then(function(result) {
            var a = result.battle.split(':'); // split it at the colons
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            var t = new Date(1970, 0, 1);
            t.setSeconds(seconds);
            GameState.time_left_battle = t;

            var a = result.ply.split(':'); // split it at the colons
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
            var t = new Date(1970, 0, 1);
            t.setSeconds(seconds);
            GameState.time_left_ply = t;
        });
    },
    
    processActionResult: function (result) {
        
        // ensure we have a result
        if (result) {
            
            // has the result changed?
            if (!_.isEqual(result, GameState.last_result)) {
            
                // debug
                //console.log(PP(result));
            
                // have any results been missed?
                if (result.num === GameState.last_last_result.num + 1) {
                    
                    // if not, just apply the result itself
                    GameState.applyResults(result);
                    GameState.updateActionNumber(result.num);
                    
                } else {
                    
                    // process state because we missed some results
                    GameState.updateState();
                }
            
                // pesist results
                GameState.last_last_result = GameState.last_result;
                GameState.last_result = result;
            }
        }
    },
    
    applyResults: function (result) {
        var cmd = result.command;
        var res = result.response;
        var type = cmd.type;
        
        // check for applied damage
        if (result.applied) {
            apply_dmgs(result.applied);
        }
        
        // update results
        if (type == "move") {
            Battlefield.move_scient(cmd.unit, cmd.target)
        } else if (type == "attack") {
            apply_dmgs(res.result)
        }
        
        function apply_dmgs (damages) {
            for (var d in damages) {
                var damage = damages[d];
                Battlefield.apply_dmg(damage[0], damage[1]);
            }
        }
    },
    
    updateActionNumber: function (num) {
        GameState.action_count = num;
        if ((GameState.action_count % 2) === 1) { //does the action have an odd number?
            GameState.ply_no = Math.ceil(GameState.action_count / 2);
            if ((GameState.action_count % 4) === 1) {
                GameState.turn_no = Math.ceil(GameState.ply_no / 2);
            }
        }
        if ((GameState.ply_no % 2) === 1) { //ply_no determines whose_action it is.
            GameState.whose_action = GameState.player_names[0];
        } else {
            GameState.whose_action = GameState.player_names[1];
        }
    },
    
    updateState: function () {
        var last_state = battleService.get_last_state();
        var state = undefined;
        last_state.then(function(state) {
            if (state != null) {
                if (state.locs) { 
                    // when is state ever false?
                    // the first turn when there is no last_state.
                    // also when 'turn' advances (not ply)
                    
                    //NOTE: THIS IS WHAT ACTUALLY CHANGES THE GAME STATE.
                    GameState.HPs = state.HPs;
                    GameState.updateUnitLocations(state.locs);
                } else {
                    console.log("GameState.update is false.");  // ??
                }
                GameState.updateActionNumber(state.num + 1);
            }
        });
    },
    
    updateUnitLocations: function(locs) {
        var change = false;
        for (var ID in locs) {
            var loc = locs[ID]
            var scient = this.units[ID].scient;
            if (!_.isEqual(scient.location, loc)) {
                var oldX = scient.location[0];
                var oldY = scient.location[1];
                var newX = loc[0];
                var newY = loc[1];
                this.battlefield.grid.tiles[oldX][oldY].contents = null;
                this.battlefield.grid.tiles[newX][newY].contents = scient;
                scient.location = loc;
                change = true;
            }
        }

        this.battlefield.locs = locs;
        this.locs = locs;   // we should try to only have one reference to locs - is the right one in battlefield?
        return change;
    },
    
    getUnitById: function(id) {
        if (this.units[id]) {
            return this.units[id];
        }

        return false;
    },
    
    getUnitByName: function(name) { //buggy?
        for (var id in this.units) {
            var unit = this.units[id];
            if (unit.scient && unit.scient.name == name) return unit;
            if (unit.nescient && unit.nescient.name == name) return unit;
        }

        return false;
    },
    
    getUnitIdByName: function(name) {
        for (var id in this.units) {
            var unit = this.units[id];
            if (unit.scient && unit.scient.name == name) return id;
            if (unit.nescient && unit.nescient.name == name) return id;
        }

        return false;
    },
    
    getUnitIdByContents: function(contents) {
        if (contents.scient) return this.getUnitIdByName(contents.scient.name);
        if (contents.nescient) return this.getUnitIdByName(contents.nescient.name);

        return false;
    },
    
    getUnitIdByLocation: function(x, y) {
        for (var l in this.locs) {
            if (this.locs[l][0] == x && this.locs[l][1] == y) return l;
        }

        return false;
    },

    print: function() {
        console.log("userID        Loc Owner HPs");
        for (var puserID in this.locs) {
            console.log("\t" + puserID + ": " + this.locs[puserID] + " " + this.owners[puserID] + "\t" + this.HPs[puserID]);
        }
    },
    
    move: function(args){
        var type = "move";
        var unitID = args.unitID || "";
        var targetLocation = args.targetLocation || [0,0];
        
        //Example 
        //battleService.process_action(["48632008", "move", [2, 2]])
        var action = battleService.process_action([
            unitID, //Unit
            type, //Type
            targetLocation //Target
        ]);
        
        action.addCallback(function(response){
            //TODO Update Gamestage field -- (We'll get the field update on the next long poll)
            if(response.response.result){
                //TODO check for applied damage.
                var unitID = response.response.result[0][0];
                var targetLocation = response.response.result[0][1];
                console.log("move result: " + targetLocation);
                var unit = GameState.getUnitById(unitID);
                console.log(unit);
                if(unit){
                    if(unit.scient){
                        GameState.battlefield.move_scient(unitID, targetLocation);
                        unit.scient.location = targetLocation;
                    }else if(unit.nescient){
                        unit.nescient.location = targetLocation;
                    }
                }
                ui.setLeftUnit();
                ui.setRightUnit();
            }
            Field.update();
            return response; 
        });
        
        action.addErrback(function(response){
            ui.showMessage({message: response});
            return response;
        });
        
        return action;
    },
    
    attack: function(args){
        var type = "attack";
        var unitID = args.unitID || "";
        var targetLocation = args.targetLocation || [0,0];
        
        //Example???
        //battleService.process_action(["48632008", "attack", [2, 2]])
        var action = battleService.process_action([
            unitID, //Unit
            type, //Type
            targetLocation //Target
        ]);
        
        action.addCallback(function(response){
            //TODO Update Gamestage field -- (We'll get the field update on the next long poll)
            if(response.response.result){
                //TODO correctly handle wand/bow attacks (use a for each).
                //TODO check for applied damage.
                ui.setLeftUnit();
                ui.setRightUnit();
                if(response.response.result[0][1] != "Dead."){
                    var unitID = response.response.result[0][0];
                    var amount = response.response.result[0][1];
                    console.log("unitID: " + unitID);
                    console.log("amount: " + amount);
                    GameState.battlefield.apply_dmg(unitID, amount);
                    ui.showMessage({message: amount + " Damage."});
                }else{
                    GameState.battlefield.bury(unitID);
                    ui.showMessage({message: "Unit defeated."});
                }
            }
            Field.update();
            return response;
        });
        
        action.addErrback(function(response){
            ui.showMessage({message: response});
            return response;
        });
        
        return action;
    },
    
    pass: function(args){
        var type = "pass";
        
        var action = battleService.process_action([
            null,
            type, //Type
            null
        ]);
        
        action.addCallback(function(response){
            ui.showMessage({message: "You have passed for one action."});
            return response; 
        });
        
        action.addErrback(function(response){
            ui.showMessage({message: response});
            return response;
        });
    }
};
