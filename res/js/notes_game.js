//then the ui need only ever draw the battlefield. then poll and call changeState again?


function game(){
    var battlefield: undefined;
    
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