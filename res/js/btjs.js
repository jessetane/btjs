var _intervalUpdateState;

var GameState = {
	grid : undefined,
	locs : undefined,
	owners : undefined,
	start_time : undefined,
	units : undefined,
	HPs : undefined,

	init : function(result) {
		this.grid = result.initial_state.grid.grid;
		this.locs = result.initial_state.init_locs;
		this.owners = result.initial_state.owners;
		this.start_time = result.initial_state.start_time;
		this.units = result.initial_state.units;
	},
	update : function(result) {
		this.clearGridContents();
		this.HPs = result.HPs;
		return this.updateUnitLocations(result.locs);

	},
	clearGridContents : function() {
		for (var x in this.grid.tiles) {
			for (var y in this.grid.tiles[x]) {
				var tile = this.grid.tiles[x][y].tile;
				tile.contents = null;
			}
		}
	},
	updateUnitLocations : function(locs) {
		var change = false;
		for (var l in locs) {
			if(this.units[l].location != locs[l]){
				this.units[l].location = locs[l];
				this.grid.tiles[this.units[l].location[0]][this.units[l].location[1]].tile.contents = null;
				this.grid.tiles[locs[l][0]][locs[l][1]].tile.contents = this.units[l];
				change = true;
			}
		}

		this.locs = locs;
		return change;
	},
	getUnitIdByName : function(name) {
		for (var id in this.units) {
			var unit = this.units[id];
			if (unit.scient && unit.scient.name == name)
				return id;
			if (unit.nescient && unit.nescient.name == name)
				return id;
		}

		return false;
	},
	getUnitIdByContents : function(contents) {
		if (contents.scient)
			return this.getUnitIdByName(contents.scient.name);
		if (contents.nescient)
			return this.getUnitIdByName(contents.nescient.name);

		return false;
	},
	getUnitIdByLocation: function(x, y){
		for (var l in this.locs) {
			if(this.locs[l][0] == x && this.locs[l][1] == y) return l;
		}
		
		return false;
	}
}