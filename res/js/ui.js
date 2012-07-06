//Should we use canvas or DOM?
var UI = {

	_intervalTimer: undefined,
	
	_modalCallback: undefined,

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
			action: new Kinetic.Text({
			    x: 100,
			    y: 92,
			    text: "Whose Action? ",
			    fontSize: 12,
			    textFill: "white",
			    fontFamily: "SansationRegular",
			    align: "center",
			    verticalAlign: "middle"
			}),
			actionNo: new Kinetic.Text({
			    x: 100,
			    y: 122,
			    text: "Action #",
			    fontSize: 12,
			    textFill: "white",
			    fontFamily: "SansationRegular",
			    align: "center",
			    verticalAlign: "middle"
			}),
			turn: new Kinetic.Text({
				x: 100,
				y: 152,
				text: "Turn #",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			})
		}
	},
	
	buttonPass: {
		layer: new Kinetic.Layer(),
		shape: new Kinetic.RegularPolygon({
			name: "button-pass",
			x: 100,
			y: 562,
			sides: 6,
			radius: 60,
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0.25)',
			strokeWidth: 5
		}),
		text: {
			label: new Kinetic.Text({
				x: 100,
				y: 562,
			    text: "Pass",
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
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
        
        UI.buttonPass.shape.on("click", function(){
        	UI.showConfirm({
        		header: "Pass",
        		message: "Are you sure?",
        		onconfirm: function(){
					Services.pass();
        		}
        	});
		});
		
        UI.timer.layer.add(UI.timer.text.time);
        UI.timer.layer.add(UI.timer.text.action);
        UI.timer.layer.add(UI.timer.text.actionNo);
        UI.timer.layer.add(UI.timer.text.turn);
        UI.timer.layer.add(UI.timer.text.player);
        UI.stageRight.add(UI.timer.layer);
		
		UI.unitLeft.layer.add(UI.unitLeft.shape);
		UI.unitLeft.layer.add(UI.unitLeft.text.name);	
		UI.unitLeft.layer.add(UI.unitLeft.text.hp);		
		UI.unitLeft.layer.add(UI.unitLeft.text.unitComp);	
		UI.unitLeft.layer.add(UI.unitLeft.text.secondaryComp);	
        UI.stageLeft.add(UI.unitLeft.layer);
        
        UI.unitLeft.layer.add(UI.buttonPass.shape);	
		UI.unitLeft.layer.add(UI.buttonPass.text.label);	
        UI.stageLeft.add(UI.buttonPass.layer);
        
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
				var weaponType = "";	
				if(unit.scient.weapon.bow){
					weaponType = "Bow";	
				}
				if(unit.scient.weapon.glove){
					weaponType = "Glove";	
				}
				if(unit.scient.weapon.wand){
					weaponType = "Wand";	
				}
				if(unit.scient.weapon.sword){
					weaponType = "Sword";	
				}
				var secondaryComp = "Weapon: " + weaponType + "\n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + 
									"F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " +
									"I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " +
									"W:" + unit.scient.weapon_bonus.stone.comp.Wind;
			}
			unitId = GameState.getUnitIdByContents(unit);
			if(GameState.owners[unitId] == "atkr"){
				//UI.unitLeft.shape.setFill(colors_assignment[2]);
			}else{
				//UI.unitLeft.shape.setFill(colors_assignment[1]);
			}
		}else{
			var name = "";
			var hp = ""
			var unitComp = "";
			var secondaryComp = "";
		
			//UI.unitLeft.shape.setFill(colors_assignment[0]);
		}
		
		UI.unitLeft.text.name.setText(name);
		UI.unitLeft.text.hp.setText(hp);
		UI.unitLeft.text.unitComp.setText(unitComp);
		UI.unitLeft.text.secondaryComp.setText(secondaryComp);
		UI.unitLeft.layer.draw();
		//console.log(unit);
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
				var weaponType = "";	
				if(unit.scient.weapon.bow){
					weaponType = "Bow";	
				}
				if(unit.scient.weapon.glove){
					weaponType = "Glove";	
				}
				if(unit.scient.weapon.wand){
					weaponType = "Wand";	
				}
				if(unit.scient.weapon.sword){
					weaponType = "Sword";	
				}
				var secondaryComp = "Weapon: " + weaponType + "\n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + 
									"F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " +
									"I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " +
									"W:" + unit.scient.weapon_bonus.stone.comp.Wind;
			}
			unitId = GameState.getUnitIdByContents(unit);
			if(GameState.owners[unitId] == "atkr"){
				UI.unitRight.shape.setFill(colors_assignment[2]);
			}else{
				UI.unitRight.shape.setFill(colors_assignment[1]);
			}
		}else{
			var name = "";
			var hp = ""
			var unitComp = "";
			var secondaryComp = "";
		
			UI.unitRight.shape.setFill(colors_assignment[0]);
		}
		
		UI.unitRight.text.name.setText(name);
		UI.unitRight.text.hp.setText(hp);
		UI.unitRight.text.unitComp.setText(unitComp);
		UI.unitRight.text.secondaryComp.setText(secondaryComp);
		UI.unitRight.layer.draw();
		//console.log(unit);
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
		
		UI.timer.text.action.setText("Whose Action? " + GameState.whose_action);
		UI.timer.text.actionNo.setText("Action # " + GameState.action_count);
		UI.timer.text.turn.setText("Turn # " + GameState.turn_no);
		
		UI.timer.text.player.setText("Player: " + GameState.player);
		
		UI.timer.layer.draw();
	},
	
	showConfirm: function(args){
		var header = args.header || "Binary Tactics";
		var message = args.message || "Are you sure?";
		UI._modalCallback = args.onconfirm;
		
		//Hide login
		$('#modalConfirmHeader').innerHTML = header;
		$('#modalConfirmMessage').innerHTML = message;
		
		$('#modalNo').innerHTML = 'Yes';
		$('#modalNo').innerHTML = 'No';
		
		$('#modalYes').style.display = '';
		$('#modalNo').style.display = '';
		$('#modalConfirm').style.display = 'block';
	},
	
	showMessage: function(args){
		var header = args.header || "Binary Tactics";
		var message = args.message || "Hello World.";
		UI._modalCallback = args.callback;
		
		//Hide login
		$('#modalConfirmHeader').innerHTML = header;
		$('#modalConfirmMessage').innerHTML = message;
		
		$('#modalNo').innerHTML = '';
		$('#modalNo').innerHTML = 'OK';
		
		$('#modalYes').style.display = 'none';
		$('#modalNo').style.display = '';
		$('#modalConfirm').style.display = 'block';
	},
	
	modalYes: function(){
		if(UI._modalCallback) UI._modalCallback();
		$('#modalConfirm').style.display = 'none';
	},
	
	modalNo: function(){
		$('#modalConfirm').style.display = 'none';
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
				UI.showMessage({message: 'Welcome ' + username});
			});

			//Get initial state
			get_initial = Services.api.initial_state();
			get_initial.then(function(result) {
				GameState.init(result);
				//Field.update();
				
				if(GameState.player == "atkr"){
					UI.unitLeft.shape.setFill(colors_assignment[2]);
				}else{
					UI.unitLeft.shape.setFill(colors_assignment[1]);
				}
				UI.unitLeft.layer.draw();
				
				var get_state = Services.api.get_state();
				get_state.then(function(result) {
					GameState.update(result[result.length - 1]);
					Field.update();
					
					if((GameState.action_count % 2) < 2){
						GameState.whose_turn = GameState.player_names[0];
					}else{
						GameState.whose_turn = GameState.player_names[1];
					}
				});

				_intervalUpdateState = setInterval(function() {
					var get_state = Services.api.get_state();
					get_state.then(function(result) {
						if(result.length != GameState.action_count){
							GameState.action_count = result.length; 
							GameState.turn_no = ((GameState.action_count - (GameState.action_count % 4)) / 4) + 1;
							GameState.ply_no = (GameState.action_count % 2) + 1; 
							
							if(GameState.update(result[result.length - 1])) {
								Field.update();
							
								if((GameState.action_count % 2) < 2){
									GameState.whose_turn = GameState.player_names[0];
								}else{
									GameState.whose_turn = GameState.player_names[1];
								}
							};
						};
						
						myUnits = getUnits("mine");
						theirUnits = getUnits("theirs");

						return;
					});
				}, 3000);
			});
		},
		onFail : function() {
			alert('Authentication failed.');
		}
	});
}
