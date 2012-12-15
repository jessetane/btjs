
/* MAJOR BUGS
There is no desticition in the UI between the first and second action of a ply (turn).
The pass button does not work.
Players cannot target their own units.
Whose_action is set incorrectly in btjs.js
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
