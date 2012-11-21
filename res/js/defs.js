//Figuring out the best fitting include system for JS will take too long, going monolithic.
var E = "Earth";
var F = "Fire";
var I = "Ice";
var W = "Wind";

var ELEMENTS = [E, F, I, W];

function Stone(comp){
    this.comp = {"Earth":0, "Fire":0, "Ice":0, "Wind":0};
    this.comp["Earth"] = comp[0];
    this.comp["Fire"] = comp[1];
    this.comp["Ice"] = comp[2];
    this.comp["Wind"] = comp[3];
}

function Unit(element, comp, name, loc){
    Stone.call(this, comp);
    this.element = element;
    this.name = name;
    this.loc = loc;
    this.setVal = function() {return this.E + this.F + this.I + this.W;};
    this.val = this.setVal()
    this.calcstats = function() {
        this.p    = 2 * (this.F + this.E) + this.I + this.W;
        this.m    = 2 * (this.I + this.W) + this.F + this.E;
        this.atk  = 2 * (this.F + this.I) + this.E + this.W + (2 * this.val())
        this.defe = 2 * (this.E + this.W) + this.F + this.I
        
        this.pdef = this.p + this.defe + (2 * this.E)
        this.patk = this.p + this.atk  + (2 * this.F)
        this.matk = this.m + this.atk  + (2 * this.I)
        this.mdef = this.m + this.defe + (2 * this.W)
        this.hp   = 4 * ((this.pdef + this.mdef) + this.val())
    };
};

function Scient(element, comp, name, loc, weapon, weapon_bonus){
    Unit.call(this, element, comp, name, loc);
    this.move         = 4;
    this.weapon       = weapon;
    this.weapon_bonus = weapon_bonus;
    this.equip_limit  = new Stone(1,1,1,1);
    this.val          = this.setVal()
    this.calcstats()
};

function Weapon(element, comp, wep_type){
    Stone.call(this, comp);
    this.element  = element
    this.wep_type = wep_type
};

function Sword(element, comp){
    Weapon.call(this, element, comp, 'Sword')
    this.kind = 'p'
};

function Bow(element, comp){
    Weapon.call(this, element, comp, 'Bow')
    this.kind = 'p'
};

function Wand(element, comp){
    Weapon.call(this, element, comp, 'Wand')
    this.kind = 'm'
};

function Glove(element, comp){
    Weapon.call(this, element, comp, 'Glove')
    this.kind  = 'm'
    this.count = 3
};

function Tile(comp, contents){
    Stone.call(this, comp);
    this.contents = contents;
};

function Grid(comp, x, y, tiles){
    Stone.call(this, comp);
    this.x = x;
    this.y = y;
    this.size = [this.x, this.y];
    this.tiles = tiles
};

function Battlefield(grid, player, squad1, squad2){
    this.grid = grid;
    this.player = player;
    this.squad1 = squad1;
    this.squad2 = squad2;
    this.graveyard = [];
    this.dmg_queue = {};
    this.squads = [this.squad1, this.squad2]
    //this.units = this.getUnits()
    this.direction = {0:'North', 1:'Northeast', 2:'Southeast', 3:'South', 4:'Southwest', 5:'Northwest'}
    this.ranged = ['Bow',   'Magma',     'Firestorm', 'Forestfire', 'Pyrocumulus']
    this.DOT    = ['Glove', 'Firestorm', 'Icestorm',  'Blizzard',   'Pyrocumulus']
    this.AOE    = ['Wand',  'Avalanche', 'Icestorm',  'Blizzard',   'Permafrost']
    this.Full   = ['Sword', 'Magma',     'Avalanche', 'Forestfire', 'Permafrost']
    //Grid operations
    //dumb port
    this.on_grid = function(tile){
    	if (0 <= tile[0] < this.grid.x){
		if (0 <= tile[1] < this.grid.y){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
    };

    //dumb port from python
    this.get_adjacent = function(tile, direction){
    	var direction = typof direction !== 'undefined' ? direction : 'All';
        var xpos = tile[0];
	var ypos = tile[1];
	var directions = {"East": [[xpos + 1, ypos],], "West": [[xpos - 1, ypos],]}
	if (ypos &1){
		directions["North"] = [[xpos + 1, ypos - 1], [xpos, ypos - 1]];
		directions["South"] = [[xpos + 1, ypos + 1], [xpos, ypos + 1]];
		directions["Northeast"] = [[xpos + 1, ypos - 1], [xpos + 1, ypos]];
		directions["Southeast"] = [[xpos + 1, ypos + 1], [xpos + 1, ypos]];
		directions["Southwest"] = [[xpos, ypos + 1], [xpos - 1, ypos];
		directions["Northwest"] = [[xpos, ypos - 1], [xpos - 1, ypos];
	}else{
		directions["North"] = [[xpos, ypos - 1], [xpos - 1, ypos - 1]];
		directions["South"] = [[xpos, ypos + 1], [xpos - 1, ypos + 1]];
		directions["Northeast"] = [[xpos, ypos - 1], [xpos + 1, ypos]];
		directions["Southeast"] = [[xpos, ypos + 1], [xpos + 1, ypos]];
		directions["Southwest"] = [[xpos - 1, ypos + 1], [xpos - 1, ypos];
		directions["Northwest"] = [[xpos - 1, ypos - 1], [xpos - 1, ypos];
	}
	directions["All"].concat(directions["North"], directions["East"], directions["South"], directions["West"];
	var out = [];
	 
    };

    //Nescient operations
    this.make_parts = function(){};
    this.make_body = function(){};
    this.body_on_grid = function(){};
    this.can_move_nescient = function(){};
    this.move_nescient = function(){};
    this.place_nescient = function(){};
    this.get_rotations = function(){};
    this.rotate = function(){};
    //weapon operations
    this.make_pattern = function(){};
    this.map_to_grid = function(){};
    this.make_range = function(){};

};
