var E = "Earth"
var F = "Fire"
var I = "Ice"
var W = "Wind"

var ELEMENTS = [E, F, I, W]

//var Stone = var Stone = {E: 0, F:0, I:0, W:0}
function Stone(comp){
    this.E = comp[0];
    this.F = comp[1];
    this.I = comp[2];
    this.W = comp[3];
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

function Tile(contents, comp){
    Stone.call(this, comp);
    this.contents = contents;
}

function Grid(comp, x, y, tiles){
    Stone.call(this, comp);
    this.x = x;
    this.y = y;
    this.size = [this.x, this.y];
    this.tiles = tiles
}

