
/* MAJOR BUGS
There is no desticition in the UI between the first and second action of a ply (1/2 turn).
The pass button is confusing.
Players cannot target their own units.
There is no code for hexagonal adjacency.
The game model and the display code are not cleanly separated. 
blocking/events UI updates in general.
*/

function $(selector, el) {
    if (!el) {
        el = document;
    }
    return el.querySelector(selector);
}

function $$(selector, el) {
    if (!el) {
        el = document;
    }
    return el.querySelectorAll(selector);
}

Element.prototype.$ = function (selector) {
    return this.querySelector(selector);
};

Element.prototype.$$ = function (selector) {
    return this.querySelectorAll(selector);
};

var selectedPlayer = undefined; //TODO: Where to put this?

function init() {
    dojo.require("dijit.Tooltip");
    dojo.require("dojox.rpc.Service");
    dojo.require("dojox.rpc.JsonRPC");
    dojo.require("dojo.store.Memory");
    dojo.ready(function(){
        Services.battle = new dojox.rpc.Service("http://" + HOST + ":8888/battle/static/battle.smd");
    });
    
    Field.init();
    UI.init();
    resizeCanvas();
}

function resizeCanvas() {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight - 5;
    $(".shell").style.width = newWidth;
    $(".shell").style.height = newHeight;
    Field.setSize(newWidth, newHeight);
    UI.setSize(200, newHeight);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
window.onload = init;
