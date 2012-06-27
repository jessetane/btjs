//Should we use canvas or DOM?
var UI = {

	_intervalTimer: undefined,

	stageLeft : undefined,
	stageRight : undefined,

	setSize : function(width, height) {
		UI.stageLeft.setSize(width, height);
		UI.update();
	},
	
	unitLeft: {
		layer: new Kinetic.Layer(),
		shape: new Kinetic.RegularPolygon({
			name: "unit-left",
			x: 100,
			y: 100,
			sides: 6,
			radius: 100,
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0.25)',
			strokeWidth: 5
		}),
		text: {
			name: new Kinetic.Text({
				x: 100,
				y: 52,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			hp: new Kinetic.Text({
				x: 100,
				y: 72,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			unitComp: new Kinetic.Text({
				x: 100,
				y: 112,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			secondaryComp: new Kinetic.Text({
				x: 100,
				y: 152,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			})
		}
	},
	
	unitRight: {
		layer: new Kinetic.Layer(),
		shape: new Kinetic.RegularPolygon({
			name: "unit-right",
			x: 100,
			y: 562,
			sides: 6,
			radius: 100,
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0.25)',
			strokeWidth: 5
		}),
		text: {
			name: new Kinetic.Text({
				x: 100,
				y: 510,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			hp: new Kinetic.Text({
				x: 100,
				y: 530,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			unitComp: new Kinetic.Text({
				x: 100,
				y: 570,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			secondaryComp: new Kinetic.Text({
				x: 100,
				y: 610,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			})
		}
	},
	
	timer: {
		layer: new Kinetic.Layer(),
		text: {
			time: new Kinetic.Text({
				x: 100,
				y: 32,
				text: "00:00",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
<<<<<<< local
			}),
			player: new Kinetic.Text({
				x: 100,
				y: 62,
				text: "Player: ",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			}),
			turn: new Kinetic.Text({
				x: 100,
				y: 92,
				text: "Turn: ",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
=======
>>>>>>> other
			})
		}
	},
	
	init : function() {
		UI.stageLeft = new Kinetic.Stage({
			container : "ui-left",
			width : 200,
			height : 768
		});
		
		UI.stageRight = new Kinetic.Stage({
			container : "ui-right",
			width : 200,
			height : 768
		});
		
        UI.timer.layer.add(UI.timer.text.time);
<<<<<<< local
        UI.timer.layer.add(UI.timer.text.turn);
        UI.timer.layer.add(UI.timer.text.player);
=======
>>>>>>> other
        UI.stageRight.add(UI.timer.layer);
		
		UI.unitLeft.layer.add(UI.unitLeft.shape);
		UI.unitLeft.layer.add(UI.unitLeft.text.name);	
		UI.unitLeft.layer.add(UI.unitLeft.text.hp);		
		UI.unitLeft.layer.add(UI.unitLeft.text.unitComp);	
		UI.unitLeft.layer.add(UI.unitLeft.text.secondaryComp);	
        UI.stageLeft.add(UI.unitLeft.layer);
        
        UI.unitRight.layer.add(UI.unitRight.shape);
		UI.unitRight.layer.add(UI.unitRight.text.name);		
		UI.unitRight.layer.add(UI.unitRight.text.hp);		
		UI.unitRight.layer.add(UI.unitRight.text.unitComp);		
		UI.unitRight.layer.add(UI.unitRight.text.secondaryComp);
        UI.stageRight.add(UI.unitRight.layer);
        
		UI._intervalTimer = setInterval(function(){
			UI.updateTimer();
		}, 1000);        
	},

	clear : function() {
		
	},

	update : function() {
		UI.clear();
		UI.stageLeft.draw();
		UI.stageRight.draw();
	},
	
	setLeftUnit: function(unit, unitId){
		//Get stats
		if(unit){
			if(unit.scient){
				var name = "Name: " + unit.scient.name;
				var hp = "HP: " + GameState.HPs[unitId];
				var unitComp = "Comp: \n" + "E:" + unit.scient.comp.Earth +  " " +
								"F:" + unit.scient.comp.Fire + " " +
								"I:" + unit.scient.comp.Ice + " " +
								"W:" + unit.scient.comp.Wind;
				var secondaryComp = "Weapon: \n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + 
									"F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " +
									"I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " +
									"W:" + unit.scient.weapon_bonus.stone.comp.Wind;
			}
		}else{
			var name = "";
			var hp = ""
			var unitComp = "";
			var secondaryComp = "";
		}
		
		UI.unitLeft.text.name.setText(name);
		UI.unitLeft.text.hp.setText(hp);
		UI.unitLeft.text.unitComp.setText(unitComp);
		UI.unitLeft.text.secondaryComp.setText(secondaryComp);
		UI.unitLeft.layer.draw();
		console.log(unit);
	},
	
	setRightUnit: function(unit, unitId){
		//Get stats
		if(unit){
			if(unit.scient){
				var name = "Name: " + unit.scient.name;
				var hp = "HP: " + GameState.HPs[unitId];
				var unitComp = "Comp: \n" + "E:" + unit.scient.comp.Earth +  " " +
								"F:" + unit.scient.comp.Fire + " " +
								"I:" + unit.scient.comp.Ice + " " +
								"W:" + unit.scient.comp.Wind;
				var secondaryComp = "Weapon: \n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + 
									"F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " +
									"I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " +
									"W:" + unit.scient.weapon_bonus.stone.comp.Wind;
			}
		}else{
			var name = "";
			var hp = ""
			var unitComp = "";
			var secondaryComp = "";
		}
		
		UI.unitRight.text.name.setText(name);
		UI.unitRight.text.hp.setText(hp);
		UI.unitRight.text.unitComp.setText(unitComp);
		UI.unitRight.text.secondaryComp.setText(secondaryComp);
		UI.unitRight.layer.draw();
		console.log(unit);
	},
	
	updateTimer: function(){
		if(GameState.start_time){
			var startTime = new Date(new Date() - new Date(GameState.start_time));
			
			var minutes = (startTime.getMinutes().toString().length == 1)?"0"+startTime.getMinutes():startTime.getMinutes();
			var seconds = (startTime.getSeconds().toString().length == 1)?"0"+startTime.getSeconds():startTime.getSeconds();
			
			var time = minutes + ":" + seconds;
		}else{
			var time = "00:00";
		}
		
		UI.timer.text.time.setText(time);
<<<<<<< local
		
		UI.timer.text.turn.setText("Turn: " + GameState.whose_turn);
		
		UI.timer.text.player.setText("Player: " + GameState.player);
		
=======
>>>>>>> other
		UI.timer.layer.draw();
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
				GameState.player = username;
				alert('Welcome ' + username);
			});

			//Get initial state
			get_initial = Services.api.initial_state();
			get_initial.then(function(result) {
				GameState.init(result);
<<<<<<< local
				//Field.update();
=======
>>>>>>> other
				
<<<<<<< local
				var get_state = Services.api.get_state();
=======
				get_state = Services.api.get_state();
>>>>>>> other
				get_state.then(function(result) {
<<<<<<< local
					GameState.update(result[result.length - 1]);
=======
					GameState.update(result)
>>>>>>> other
					Field.update();
				});

				_intervalUpdateState = setInterval(function() {
<<<<<<< local
					var get_state = Services.api.get_state();
=======
					get_state = Services.api.get_state();
>>>>>>> other
					get_state.then(function(result) {
<<<<<<< local
						if (GameState.update(result[result.length - 1])) {
=======
						if (GameState.update(result)) {
>>>>>>> other
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
				}, 3000);
			});
		},
		onFail : function() {
			alert('Authentication failed.');
		}
	});
}