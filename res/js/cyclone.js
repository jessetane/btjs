/*
 * Requires DOJO
 */

dojo.require("dijit.Tooltip");
dojo.require("dojox.rpc.Service");
dojo.require("dojox.rpc.JsonRPC");
dojo.require("dojo.store.Memory");
dojo.ready(function(){
    function gameState(result) {
        this.grid = result.initial_state.grid.grid;
        this.init_locs = result.initial_state.init_locs;
        this.owners = result.initial_state.owners;
        this.start_time = result.initial_state.start_time;
        this.units = result.initial_state.units;
    };
     getUnits = function(whose) {
        return dojo.filter(
            Object.keys(game.owners),
            function(key) {
                if (whose == "mine"){return game.owners[key] == username}
                else {return game.owners[key] != username}
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
                var unit = game.units[unit_num];
                var element = dojo.create("li", {innerHTML: unit[Object.keys(unit)[0]].name}, dojo.byId(ul));
                //dojo.connect(element, 'onmouseover',  function(){alert(unit_num)})
                new dijit.Tooltip({connectId: element, label: unit_num});
                });
    };


    services = new dojox.rpc.Service("http://166.84.136.68:8888/battle/static/battle.smd");
    username = services.get_username();
    username.then(function(result) {username = username.results[0] });
    get_initial = services.initial_state();
    get_initial.then(function(result) {
        game = new gameState(result);
        myUnits = getUnits("mine");
        theirUnits = getUnits("theirs");
        dude = myUnits[0];
        pos  = game.init_locs[dude];
        pos  = [pos[0], pos[1] + 1];

/* services.process_action takes "pass", "action", "move"
as types. Examples in tests/hex_battle_test2.py
        process_action = services.process_action([dude, 'move', pos]); */
        //dojo.create("p", {innerHTML: "Game started at: " + game.start_time},
        //    dojo.byId("start_time"));
        BinaryTactics.gameTimeStart = game.start_time;
        populateUl(myUnits, "my_units");
        populateUl(theirUnits, "their_units");
    });
});

var cyclone = {
	login: function(args){
		var username = args.username || "";
		var password = args.password || "";
		var onSuccess = args.onSuccess;
		var onFail = args.onFail;
		
		var xhrArgs = {
			url: "http://166.84.136.68:8888/auth/login",
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
	}
}