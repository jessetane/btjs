//Should we use canvas or DOM?
var UI = {

	stage : undefined,

	setSize : function(width, height) {
		UI.stage.setSize(width, height);
		UI.update();
	},
	
	init : function() {
		UI.stage = new Kinetic.Stage({
			container : "ui",
			width : 768,
			height : 768
		});
		
	},

	clear : function() {

	},

	update : function() {
		UI.clear();
	}
}

//Functions
function authenticate() {
	//Idea--
	//Background zoomed in spinning while idle (Maybe initial titlescreen). Once clicked, login fades away, the camera zooms and spins out, then the tiles start fading to different colors (either randomly or in patterns--maybe even to music?) and displays "Authenticating...", then "Authenticating" fades and the tiles light up to the map from server.
	//$('#modalLogin').style.display = 'none';

	Services.authenticate({
		username : $("#username").value,
		password : $("#password").value,
		onSuccess : function() {
			//Hide login
			$('#modalLogin').style.display = 'none';

			//Get username
			username = Services.api.get_username();
			username.then(function(result) {
				username = username.results[0];
				alert('Welcome ' + username);
			});

			//Get initial state
			get_initial = Services.api.initial_state();
			get_initial.then(function(result) {
				GameState.init(result);

				Field.update();

				_intervalUpdateState = setInterval(function() {
					get_state = Services.api.get_state();
					get_state.then(function(result) {
						if (GameState.update(result)) {
							Field.update();
						};

						return;
						myUnits = getUnits("mine");
						theirUnits = getUnits("theirs");
						dude = myUnits[0];
						pos = GameState.init_locs[dude];
						pos = [pos[0], pos[1] + 1];

						/* services.process_action takes "pass", "action", "move"
						as types. Examples in tests/hex_battle_test2.py
						process_action = services.process_action([dude, 'move', pos]); */
						//dojo.create("p", {innerHTML: "Game started at: " + game.start_time},
						//    dojo.byId("start_time"));
						//populateUl(myUnits, "my_units");
						//populateUl(theirUnits, "their_units");
					});
				}, 10000);
			});
		},
		onFail : function() {
			alert('Authentication failed.');
		}
	});
}