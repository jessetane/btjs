/*
 * Requires DOJO
 */

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
                //TODO correctly handle wand/bow attacks (use a for each).
                //TODO check for applied damage.
                UI.setLeftUnit();
                UI.setRightUnit();
                if(response.response.result[0][1] != "Dead."){
                    var unitID = response.response.result[0][0];
                    var amount = response.response.result[0][1];
                    console.log("unitID: " + unitID);
                    console.log("amount: " + amount);
                    GameState.battlefield.apply_dmg(unitID, amount);
                    UI.showMessage({message: amount + " Damage."});
                }else{
                    GameState.battlefield.bury(unitID);
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
            UI.showMessage({message: "You have passed for one action."});
            return response; 
        });
        
        action.addErrback(function(response){
            UI.showMessage({message: response});
            return response;
        });
    },
}
