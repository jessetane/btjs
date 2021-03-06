
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

function init() {
    // get dojo
    dojo.require("dijit.Tooltip");
    dojo.require("dojox.rpc.Service");
    dojo.require("dojox.rpc.JsonRPC");
    dojo.require("dojo.store.Memory");
    dojo.ready(function() {
        battleService = new dojox.rpc.Service("/battle/static/battle.smd");
    });
    
    // API endpoints - these will be global for now
    battleService = null;
    authService = new AuthService();
    
    // as soon as we have JS.Set, start drawing the ui
    JS.require('JS.Set', function() {
        ui = new UI();
        resizeCanvas();
    });
}

function resizeCanvas() {
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight - 5;
    $(".shell").style.width = newWidth;
    $(".shell").style.height = newHeight;
    Field.setSize(newWidth, newHeight);
    ui.setSize(200, newHeight);
}

window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('orientationchange', resizeCanvas, false);
window.onload = init;
