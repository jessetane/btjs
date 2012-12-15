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
				x: 0,
				y: 32,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			hp: new Kinetic.Text({
				x: 0,
				y: 52,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			unitComp: new Kinetic.Text({
				x: 0,
				y: 92,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			secondaryComp: new Kinetic.Text({
				x: 0,
				y: 132,
				width: 200,
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
				x: 0,
				y: 490,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			hp: new Kinetic.Text({
				x: 0,
				y: 510,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			unitComp: new Kinetic.Text({
				x: 0,
				y: 550,
				width: 200,
				fontSize: 12,
				textFill: "white",
				fontFamily: "Calibri",
				align: "center",
				verticalAlign: "middle"
			}),
			secondaryComp: new Kinetic.Text({
				x: 0,
				y: 590,
				width: 200,
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
				x: 0,
				y: 32,
				width: 200,
				text: "00:00",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			}),
			timeLeftBattle: new Kinetic.Text({
				x: 0,
				y: 62,
				width: 200,
				text: "00:00",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			}),
			timeLeftPly: new Kinetic.Text({
				x: 0,
				y: 92,
				width: 200,
				text: "00:00",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			}),
			player: new Kinetic.Text({
				x: 0,
				y: 122,
				text: "Player: ",
				fontSize: 12,
				textFill: "white",
				fontFamily: "SansationRegular",
				align: "center",
				verticalAlign: "middle"
			}),
			action: new Kinetic.Text({
			    x: 0,
			    y: 152,
			    text: "Whose Action? ",
			    fontSize: 12,
			    textFill: "white",
			    fontFamily: "SansationRegular",
			    align: "center",
			    verticalAlign: "middle"
			}),
			actionNo: new Kinetic.Text({
			    x: 0,
			    y: 172,
			    text: "Action #",
			    fontSize: 12,
			    textFill: "white",
			    fontFamily: "SansationRegular",
			    align: "center",
			    verticalAlign: "middle"
			}),
			turn: new Kinetic.Text({
				x: 0,
				y: 192,
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
				x: 0,
				y: 542,
				width: 200,
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
        UI.timer.layer.add(UI.timer.text.timeLeftBattle);
        UI.timer.layer.add(UI.timer.text.timeLeftPly);
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
	
	setMoveable: function(x, y, targetUnit){
		//Clear all moveable tiles
		for(var i = 0; i < 16; i++){
            for(var j = 0; j < 16; j++){
				if(GameState.grid.tiles[i][j].tile.contents == "movable" || GameState.grid.tiles[i][j].tile.contents == "attackable") GameState.grid.tiles[i][j].tile.contents = null;            	
            }
		}
		
		range = 0;
		if(targetUnit){
			targetUnit = GameState.getUnitById(GameState.getUnitIdByName(targetUnit));
			if(targetUnit.scient) targetUnit = targetUnit.scient;
			if(targetUnit.nescient) targetUnit = targetUnit.nescient;
			
			//TODO use defs.js battlefield object. battleField.range.indexOf(weapon) > -1;
			if(targetUnit.weapon){
				//DOT -- ['Glove', 'Firestorm', 'Icestorm',  'Blizzard',   'Pyrocumulus']
				if(targetUnit.weapon.glove || targetUnit.weapon.firestorm || targetUnit.weapon.icestorm 
								|| targetUnit.weapon.blizzard || targetUnit.weapon.pyrocumulus) range = 4;
								
				//Ranged -- ['Bow',   'Magma',     'Firestorm', 'Forestfire', 'Pyrocumulus']
				if(targetUnit.weapon.bow || targetUnit.weapon.magma || targetUnit.weapon.firestorm 
								|| targetUnit.weapon.forestfire || targetUnit.weapon.pyrocumulus) range = 4;
								
				//AOE -- ['Wand',  'Avalanche', 'Icestorm',  'Blizzard',   'Permafrost']
				if(targetUnit.weapon.wand || targetUnit.weapon.avalanche || targetUnit.weapon.icestorm 
								|| targetUnit.weapon.blizzard || targetUnit.weapon.permafrost) range = 16;
								
				//Full -- ['Sword', 'Magma', 'Avalanche', 'Forestfire', 'Permafrost']
				if(targetUnit.weapon.sword || targetUnit.weapon.magma || targetUnit.weapon.avalanche 
								|| targetUnit.weapon.forestfire || targetUnit.weapon.permafrost) range = 16;
			}
		}		
		
		if(range){
			//Fill all move tiles
			for(var i = x - range; i <= x + range; i++){
	            for(var j = y - range; j <= y + range; j++){
					if(GameState.grid.tiles[i] && GameState.grid.tiles[i][j] && GameState.grid.tiles[i][j].tile.contents == null) GameState.grid.tiles[i][j].tile.contents = "movable";            	
	            }
			}
			
			//Fill all hit tiles
			for(var i = x - (range * 2); i <= x + (range * 2); i++){
	            for(var j = y - (range * 2); j <= y + (range * 2); j++){
					if(GameState.grid.tiles[i] && GameState.grid.tiles[i][j] && GameState.grid.tiles[i][j].tile.contents == null) GameState.grid.tiles[i][j].tile.contents = "attackable";            	
	            }
			}
		}
		
		Field.update();
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
		
		if(GameState.time_left_battle){
			var startTime = new Date(GameState.time_left_battle);
			
			var minutes = (startTime.getMinutes().toString().length == 1)?"0"+startTime.getMinutes():startTime.getMinutes();
			var seconds = (startTime.getSeconds().toString().length == 1)?"0"+startTime.getSeconds():startTime.getSeconds();
			
			var timeLeftBattle = minutes + ":" + seconds;
		}else{
			var timeLeftBattle = "00:00";
		}
		
		if(GameState.time_left_ply){
			var startTime = new Date(GameState.time_left_ply);
			
			var minutes = (startTime.getMinutes().toString().length == 1)?"0"+startTime.getMinutes():startTime.getMinutes();
			var seconds = (startTime.getSeconds().toString().length == 1)?"0"+startTime.getSeconds():startTime.getSeconds();
			
			var timeLeftPly = minutes + ":" + seconds;
		}else{
			var timeLeftPly = "00:00";
		}
		
		UI.timer.text.time.setText(time);
		UI.timer.text.timeLeftBattle.setText(timeLeftBattle);
		UI.timer.text.timeLeftPly.setText(timeLeftPly);
		
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
			username = Services.battle.get_username();
			username.then(function(result) {
				username = username.results[0];
				GameState.player = username;
				UI.showMessage({message: 'Welcome ' + username});
			});

			//Get initial state
			get_initial = Services.battle.initial_state();
			get_initial.then(function(result) {
				GameState.init(result);
				//Field.update();
				
				if(GameState.player == "atkr"){
					UI.unitLeft.shape.setFill(colors_assignment[2]);
				}else{
					UI.unitLeft.shape.setFill(colors_assignment[1]);
				}
				UI.unitLeft.layer.draw();
				
				var get_state = Services.battle.get_state();
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
					var get_state = Services.battle.get_state();
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
					
					var get_timeLeft = Services.battle.time_left();
					get_timeLeft.then(function(result) {
						var a = result.battle.split(':'); // split it at the colons
						var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
						var t = new Date(1970,0,1);
						t.setSeconds(seconds);
						GameState.time_left_battle = t;
						
						var a = result.ply.split(':'); // split it at the colons
						var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
						var t = new Date(1970,0,1);
						t.setSeconds(seconds);
						GameState.time_left_ply = t;
					});
				}, 1000);
			});
		},
		onFail : function() {
			alert('Authentication failed.');
		}
	});
}
