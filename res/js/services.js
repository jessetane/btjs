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
            Object.keys(game.owners),
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

    Services.api = new dojox.rpc.Service("http://166.84.136.68:8888/battle/static/battle.smd");
});

var Services = {
	authenticate: function(args){
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
	},
	
	api: undefined
}