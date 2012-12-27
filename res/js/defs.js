//Figuring out the best fitting include system for JS will take too long, going monolithic.
//Lots of constructor cheating.
var E = "Earth";
var F = "Fire";
var I = "Ice";
var W = "Wind";

var ELEMENTS = [E, F, I, W];

function Stone(comp) {
    "use strict";
    this.comp = {"Earth": 0, "Fire": 0, "Ice": 0, "Wind": 0};
    this.comp.Earth = comp[0];
    this.comp.Fire  = comp[1];
    this.comp.Ice   = comp[2];
    this.comp.Wind  = comp[3];
}

function Unit(element, comp, name, loc) {
    "use strict";
    Stone.call(this, comp);
    this.element = element;
    this.name = name;
    this.loc = loc;
    this.setVal = function () {return this.comp[E] + this.comp[F] + this.comp[I] + this.comp[W]; };
    this.val = this.setVal();
    this.calcstats = function () {
        this.p    = 2 * (this.comp[F] + this.comp[E]) + this.comp[I] + this.comp[W];
        this.m    = 2 * (this.comp[I] + this.comp[W]) + this.comp[F] + this.comp[E];
        this.atk  = 2 * (this.comp[F] + this.comp[I]) + this.comp[E] + this.comp[W] + (2 * this.val);
        this.defe = 2 * (this.comp[E] + this.comp[W]) + this.comp[F] + this.comp[I];
        //
        this.pdef = this.p + this.defe + (2 * this.comp[E]);
        this.patk = this.p + this.atk  + (2 * this.comp[F]);
        this.matk = this.m + this.atk  + (2 * this.comp[I]);
        this.mdef = this.m + this.defe + (2 * this.comp[W]);
        this.hp   = 4 * ((this.pdef + this.mdef) + this.val);
    };
}

function Scient(scient) {
    "use strict";
    //Cheating with the constructor, scient takes a scient as input.
    //old constuctor: element, comp, name, loc, weapon, weapon_bonus
    var element       = scient.element;
    var comp          = _.values(scient.comp);
    var name          = scient.name;
    var loc           = scient.location;
    Unit.call(this, element, comp, name, loc);
    this.move         = 4;
    var wep           = scient.weapon;
    var wep_type      = _.keys(wep)[0];
    var wep_el        = wep[wep_type].element;
    var wep_comp      = _.values(wep[wep_type].comp);
    //bad idea.
    this.weapon       = new window[wep_type.charAt(0).toUpperCase() + wep_type.slice(1)](wep_el, wep_comp)
    this.weapon_bonus = scient.weapon_bonus;
    this.sex          = scient.sex
    this.val          = this.setVal();
    this.calcstats();
}

function Weapon(element, comp, wep_type) {
    "use strict";
    Stone.call(this, comp);
    this.element  = element;
    this.wep_type = wep_type;
}

function Sword(element, comp) {
    "use strict";
    Weapon.call(this, element, comp, 'Sword');
    this.kind = 'p';
}

function Bow(element, comp) {
    "use strict";
    Weapon.call(this, element, comp, 'Bow');
    this.kind = 'p';
}

function Wand(element, comp) {
    "use strict";
    Weapon.call(this, element, comp, 'Wand');
    this.kind = 'm';
}

function Glove(element, comp) {
    "use strict";
    Weapon.call(this, element, comp, 'Glove');
    this.kind  = 'm';
    this.count = 3;
}

function Tile(comp, contents) {
    "use strict";
    Stone.call(this, comp);
    this.contents = contents;
}

function Grid(grid) {
    "use strict";
    var comp = _.values(grid.comp);
    Stone.call(this, comp);
    this.x = grid.x;
    this.y = grid.y;
    this.size = [this.x, this.y];
    //convert tiles and contents.
    var tiles = [];
    for (var i in _.range(this.x)) {
        tiles[i] = [];
        for (var j in _.range(this.y)) {
            var comp = _.values(grid.tiles[i][j].tile.comp);
            var contents = null;
            try {contents = new Scient(grid.tiles[i][j].tile.contents.scient);} catch(e){};
            tiles[i][j] =  new Tile(comp, contents);
        };
    };
    this.tiles = tiles;
}
JS.require('JS.Set');
function Battlefield(grid, units) {
    "use strict";
    this.grid  = new Grid(grid);
    this.units = units;
    this.graveyard = [];
    this.dmg_queue = {};
    this.direction = {0: 'North', 1: 'Northeast', 2: 'Southeast', 3: 'South', 4: 'Southwest', 5: 'Northwest'};
    this.ranged = ['Bow',   'Magma',     'Firestorm', 'Forestfire', 'Pyrocumulus'];
    this.DOT    = ['Glove', 'Firestorm', 'Icestorm',  'Blizzard',   'Pyrocumulus'];
    this.AOE    = ['Wand',  'Avalanche', 'Icestorm',  'Blizzard',   'Permafrost'];
    this.Full   = ['Sword', 'Magma',     'Avalanche', 'Forestfire', 'Permafrost'];
    
    //Grid operations
    //dumb port
    this.on_grid = function (tile) {
        if (0 <= tile[0] && tile[0] < this.grid.x) {
            if (0 <= tile[1] && tile[1] < this.grid.y) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    //dumb port from hex_battlefield.py
    this.get_adjacent = function (tile, direction, distance) {
        var direction = typeof direction !== 'undefined' ? direction : 'All';
        var xpos = tile[0];
        var ypos = tile[1];
        var directions = {"East": [[xpos + 1, ypos],], "West": [[xpos - 1, ypos],]};
        if (ypos & 1) {
            directions["North"] = [[xpos + 1, ypos - 1], [xpos, ypos - 1]];
            directions["South"] = [[xpos + 1, ypos + 1], [xpos, ypos + 1]];
            directions["Northeast"] = [[xpos + 1, ypos - 1], [xpos + 1, ypos]];
            directions["Southeast"] = [[xpos + 1, ypos + 1], [xpos + 1, ypos]];
            directions["Southwest"] = [[xpos, ypos + 1], [xpos - 1, ypos]];
            directions["Northwest"] = [[xpos, ypos - 1], [xpos - 1, ypos]];
        } else {
            directions["North"] = [[xpos, ypos - 1], [xpos - 1, ypos - 1]];
            directions["South"] = [[xpos, ypos + 1], [xpos - 1, ypos + 1]];
            directions["Northeast"] = [[xpos, ypos - 1], [xpos + 1, ypos]];
            directions["Southeast"] = [[xpos, ypos + 1], [xpos + 1, ypos]];
            directions["Southwest"] = [[xpos - 1, ypos + 1], [xpos - 1, ypos]];
            directions["Northwest"] = [[xpos - 1, ypos - 1], [xpos - 1, ypos]];
        }
        directions["All"] = [];
        directions["All"] = directions["All"].concat(directions["North"], directions["East"], directions["South"], directions["West"]);
        var out = new JS.Set();
        var idx, len;
        for (idx = 0, len = directions[direction].length; idx < len; idx++) {
            var loc = directions[direction][idx];
            if (this.on_grid(loc)) {
                out.add(loc);
            }
        }
        return out;
    }
    
    //Nescient operations
    this.make_parts = function () {} ;
    this.make_body = function () {} ;
    this.body_on_grid = function () {} ;
    this.can_move_nescient = function () {} ;
    this.move_nescient = function () {} ;
    this.place_nescient = function () {} ;
    this.get_rotations = function () {} ;
    this.rotate = function () {} ;
    
    // weapon ops
    this.make_pattern = function (loc, distance, pointing) {
        var tiles = [];
        var pattern = [];
        var head = this.get_adjacent(loc, pointing);
        var cols = 1;
        while (cols !== distance) {
            pattern = pattern.concat(head.toArray());
            var temp_head = head;
            head = new JS.Set()
            for (var loc in temp_head) {
                head.add(this.get_adjacent(loc, pointing));
            }
            cols++;
        }
        return pattern;
    };

    this.map_to_grid = function (loc, weapon) {
      var weaponHasRange = false;
      var weaponHasAOE = false;
      for (var w in this.ranged) {
          if (this.ranged[w] === weapon.type) {
              weaponHasRange = true;
              break;
          }   
      }   
      for (var w in this.AOE) {
          if (this.AOE[w] === weapon.type) {
              weaponHasAOE = true;
              break;
          }   
      }   
      if (weaponHasRange) {
          var move = 4;
          var no_hit = this.make_range(loc, move)
          var hit = this.make_range(loc, 2 * move)
          return hit.difference(no_hit);
      } else if (weaponHasAOE) {
          var tiles = []
          for (var x=0; x<this.grid.x; x++) {
              for (var y=0; y<this.grid.y; y++) {
                  if (x !== loc[0] || y !== loc[1]) {
                      var pt = [x, y]
                      tiles.push();
                  }
              }   
          }   
          return tiles;
      } else {
          return this.get_adjacent(loc)   
      }   
    };  

    this.make_range = function (location, distance) {
        var tilesets = [ this.get_adjacent(location) ];
        while (tilesets.length < distance) {
            var tileset = tilesets.slice(-1)[0].toArray();
            for (var t in tileset) {
                var tile = tileset[t];
                tilesets.push(this.get_adjacent(tile));
            }
        }
        var group = new JS.Set();
        for (var t in tilesets) {
            group = group.union(tilesets[t]);
        }
        return group;
    };

};
