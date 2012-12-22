/*
 * Requires DOJO
 */

dojo.require("dijit.Tooltip");
dojo.require("dojox.rpc.Service");
dojo.require("dojox.rpc.JsonRPC");
dojo.require("dojo.store.Memory");
dojo.ready(function(){
     getUnits = function(whose) {
        return dojo.filter(
            Object.keys(GameState.owners),
            function(key) {
                if (whose == "mine"){return GameState.owners[key] == username}
                else {return GameState.owners[key] != username}
                });
            };
    //mutates json tiles to actual js tiles.
    mutateTiles = function(grid) {
      for (var i in _.range(grid.x)) {
          for (var j in _.range(grid.y)) {
            grid.tiles[i][j] =  new Tile(_.values(grid.tiles[i][j].tile['comp']), grid.tiles[i][j].tile.contents)
          };
      };
    };
    getStats = function() {this.innerHTML}
    populateUl = function(units, ul) {
        dojo.map(units,
            function(unit_num){
                var unit = GameState.units[unit_num];
                var element = dojo.create("li", {innerHTML: unit[Object.keys(unit)[0]].name}, dojo.byId(ul));
                //dojo.connect(element, 'onmouseover',  function(){alert(unit_num)})
                new dijit.Tooltip({connectId: element, label: unit_num});
                });
    };

    Services.battle = new dojox.rpc.Service("http://" + HOST + ":8888/battle/static/battle.smd");
});

var Services = {
    authenticate: function(args){
        var username = args.username || "";
        var password = args.password || "";
        var onSuccess = args.onSuccess;
        var onFail = args.onFail;
        
        //This will be removed when a real public key authentication service is implemented.
        var xhrArgs = {
            url: "http://" + HOST + ":8888/auth/login",
            postData: "u=" + username + "&p=" + password,
            handleAs: "json",
            preventCache: true,
            load: function(data){
                console.log("Response: " + data);
                if(onSuccess) onSuccess();
            },
            error: function(data){
                console.log("Response (error): " + data);
                if(onFail) onFail();
            }
        }
        
        // Call the asynchronous xhrPost
        console.log("Form being sent...");
        dojo.xhrPost(xhrArgs);
    },
    
    move: function(args){
        var type = "move";
        var unitID = args.unitID || "";
        var targetLocation = args.targetLocation || [0,0];
        
        //Example 
        //Services.battle.process_action(["48632008", "move", [2, 2]])
        var action = Services.battle.process_action([
            unitID, //Unit
            type, //Type
            targetLocation //Target
        ]);
        
        action.addCallback(function(response){
            //TODO Update Gamestage field -- (We'll get the field update on the next long poll)
            if(response.response.result){
                var unit = GameState.getUnitById(response.response.result[0][0]);
                console.log(unit);
                if(unit){
                    if(unit.scient){
                        unit.scient.location = response.response.result[0][1];
                    }else if(unit.nescient){
                        unit.nescient.location = response.response.result[0][1];
                    }
                }
                UI.setLeftUnit();
                UI.setRightUnit();
            }
            Field.update();
            return response; 
        });
        
        action.addErrback(function(response){
            UI.showMessage({message: response});
            return response;
        });
    },
    
    attack: function(args){
        var type = "attack";
        var unitID = args.unitID || "";
        var targetLocation = args.targetLocation || [0,0];
        
        //Example???
        //Services.battle.process_action(["48632008", "attack", [2, 2]])
        var action = Services.battle.process_action([
            unitID, //Unit
            type, //Type
            targetLocation //Target
        ]);
        
        action.addCallback(function(response){
            //TODO Update Gamestage field -- (We'll get the field update on the next long poll)
            if(response.response.result){
                UI.setLeftUnit();
                UI.setRightUnit();
                
                if(response.response.result[0][1] != "Dead."){
                    UI.showMessage({message: response.response.result[0][1] + " Damage."});
                }else{
                    UI.showMessage({message: "Unit defeated."});
                }
            }
            Field.update();
            return response; 
        });
        
        action.addErrback(function(response){
            UI.showMessage({message: response});
            return response;
        });
    },
    
    pass: function(args){
        var type = "pass";
        
        var action = Services.battle.process_action([
            null,
            type, //Type
            null
        ]);
        
        action.addCallback(function(response){
            UI.showMessage({message: "You have passed your turn."});
            return response; 
        });
        
        action.addErrback(function(response){
            UI.showMessage({message: response});
            return response;
        });
    },
    
    battle: undefined
}