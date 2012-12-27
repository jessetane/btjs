//game object to replace GameState in btjs.js and parts of ui.js(!)
function game(){
    //hex_battlefield vars
    var owners: undefined;
    var units; undefined;
    var HPs: undefined;
    var locs: undefined;
    var grid: undefined;
    var battlefield: undefined;
    var queued: undefined;
    
    //hex_game vars
    var start_time: undefined;
    var num: undefined; //AKA action_no. ply_no and turn_no are derived from this.
    var hp_count: undefined;
    var old_defsquad_hp: undefined;
    var pass_count: undefined;
    var game_over: undefined;
    
    this.changeState(state) {
        //Takes an Initial_State, State or a result from process_action and applies it to the game
        
    };
    this.init() {
        var results = services.battle.get_init_state();
        var state = results.results
        this.changeState(state)
    };
    this.process_action(unit, action, location) {
        var result = Services.battle.process_action(unit, action, location);
        this.changeState(result)
    };
}


init keys: ["owners", "start_time", "init_locs", "player_names", "grid", "units"]
last_state keys: ["whose_action", "game_over", "HPs", "locs", "num", "hp_count", "old_defsquad_hp", "pass_count", "queued"]
last_result keys: ["command", "response"]
