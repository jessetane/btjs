//Figuring out the best fitting include system for JS will take too long, going monolithic.
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
    this.setVal = function () {return this.E + this.F + this.I + this.W; };
    this.val = this.setVal();
    this.calcstats = function () {
        this.p    = 2 * (this.F + this.E) + this.I + this.W;
        this.m    = 2 * (this.I + this.W) + this.F + this.E;
        this.atk  = 2 * (this.F + this.I) + this.E + this.W + (2 * this.val());
        this.defe = 2 * (this.E + this.W) + this.F + this.I;
        //
        this.pdef = this.p + this.defe + (2 * this.E);
        this.patk = this.p + this.atk  + (2 * this.F);
        this.matk = this.m + this.atk  + (2 * this.I);
        this.mdef = this.m + this.defe + (2 * this.W);
        this.hp   = 4 * ((this.pdef + this.mdef) + this.val());
    };
}

function Scient(element, comp, name, loc, weapon, weapon_bonus) {
    "use strict";
    Unit.call(this, element, comp, name, loc);
    this.move         = 4;
    this.weapon       = weapon;
    this.weapon_bonus = weapon_bonus;
    this.equip_limit  = new Stone(1, 1, 1, 1);
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

function Grid(comp, x, y, tiles) {
    "use strict";
    Stone.call(this, comp);
    this.x = x;
    this.y = y;
    this.size = [this.x, this.y];
    this.tiles = tiles;
}
JS.require('JS.Set');
function Battlefield(grid, player, squad1, squad2) {
    "use strict";
    this.grid = grid;
    this.player = player;
    this.squad1 = squad1;
    this.squad2 = squad2;
    this.graveyard = [];
    this.dmg_queue = {};
    this.squads = [this.squad1, this.squad2];
    //this.units = this.getUnits()
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
            var temp = new JS.Set();
            for (var t in tileset) {
                var tile = tileset[t];
                temp.add(this.get_adjacent(tile));
            }
            tilesets.push(temp);
        }
        var group = new JS.Set();
        for (var t in tilesets) {
            group.union(tilesets[t]);
        }
        return group;
    };

};
