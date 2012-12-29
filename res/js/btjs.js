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

    //This init function is bad, it should check the current state AND initial_state.
    init: function() {
        this.gi = Services.battle.initial_state();
        this.gi.then(function(res) {
            //scope?
            GameState.init_state = res.initial_state;
            GameState.grid = res.initial_state.grid.grid;
            GameState.locs = res.initial_state.init_locs;
            GameState.owners = res.initial_state.owners;
            GameState.start_time = res.initial_state.start_time;
            GameState.units = res.initial_state.units;
            GameState.player_names = res.initial_state.player_names;
            GameState.whose_action = GameState.player_names[0];

            //TODO Calculate HPs
            GameState.HPs = [];
            for (var key in GameState.units) {
                GameState.HPs[key] = 0;
            }
            GameState.battlefield = new Battlefield(GameState.grid, GameState.locs, GameState.owners);
        });
        console.log("init finished.");
    },
    update: function() {
        var last_state = Services.battle.get_last_state();
        var state = undefined;
        last_state.then(function(state) {
            if (state != null) { //Catches the first turn when there is no last_state.
                var num = state.num + 1; //The last_state is not the current state!
                if (num != GameState.action_count) { //have we polled already this action?
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
                }

                //It's real in these streets mane.
                //myUnits = getUnits("mine");
                //theirUnits = getUnits("theirs");
                if (state.locs) { //when is this ever false?
                    GameState.clearGridContents();
                    GameState.HPs = state.HPs;
                    GameState.updateUnitLocations(state.locs);

                } else {
                    console.log("GameState.update is false.");
                    //return true;
                }
            }
        });
    },
    clearGridContents: function() {
        for (var x in this.grid.tiles) {
            for (var y in this.grid.tiles[x]) {
                var tile = this.grid.tiles[x][y].tile;
                tile.contents = null;
            }
        }
    },
    updateUnitLocations: function(locs) {
        var change = false;
        for (var l in locs) {
            if (this.units[l].location != locs[l]) {
                this.units[l].location = locs[l];
                this.grid.tiles[this.units[l].location[0]][this.units[l].location[1]].tile.contents = null;
                this.grid.tiles[locs[l][0]][locs[l][1]].tile.contents = this.units[l];
                change = true;
            }
        }

        this.locs = locs;
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
    }
};
