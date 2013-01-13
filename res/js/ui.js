//Should we use canvas or DOM?
function UI() {

    var self = this;
  
    this._intervalTimer = undefined;
    this._modalCallback = undefined;

    this.unitLeft = {
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
    };

    this.unitRight = {
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
    };

    this.timer = {
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
            /*
            ply: new Kinetic.Text({
                x: 0,
                y: 192,
                text: "Ply #",
                fontSize: 12,
                textFill: "white",
                fontFamily: "SansationRegular",
                align: "center",
                verticalAlign: "middle"
            }),
            */
            turn: new Kinetic.Text({
                x: 0,
                y: 192,
                //y: 212,
                text: "Turn #",
                fontSize: 12,
                textFill: "white",
                fontFamily: "SansationRegular",
                align: "center",
                verticalAlign: "middle"
            })
        }
    };

    this.buttonPass = {
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
    };
  
    ///////
  
    this.stageLeft = new Kinetic.Stage({
        container: "ui-left",
        width: 200,
        height: 768
    });

    this.stageRight = new Kinetic.Stage({
        container: "ui-right",
        width: 200,
        height: 768
    });

    this.buttonPass.shape.on("click", function() {
        self.showConfirm({
            header: "Pass",
            message: "Are you sure?",
            onconfirm: function() {
                GameState.pass();
            }
        });
    });

    this.timer.layer.add(this.timer.text.time);
    this.timer.layer.add(this.timer.text.timeLeftBattle);
    this.timer.layer.add(this.timer.text.timeLeftPly);
    this.timer.layer.add(this.timer.text.action);
    this.timer.layer.add(this.timer.text.actionNo);
    //this.timer.layer.add(this.timer.text.ply);
    this.timer.layer.add(this.timer.text.turn);
    this.timer.layer.add(this.timer.text.player);
    this.stageRight.add(this.timer.layer);

    this.unitLeft.layer.add(this.unitLeft.shape);
    this.unitLeft.layer.add(this.unitLeft.text.name);
    this.unitLeft.layer.add(this.unitLeft.text.hp);
    this.unitLeft.layer.add(this.unitLeft.text.unitComp);
    this.unitLeft.layer.add(this.unitLeft.text.secondaryComp);
    this.stageLeft.add(this.unitLeft.layer);

    this.unitLeft.layer.add(this.buttonPass.shape);
    this.unitLeft.layer.add(this.buttonPass.text.label);
    this.stageLeft.add(this.buttonPass.layer);

    this.unitRight.layer.add(this.unitRight.shape);
    this.unitRight.layer.add(this.unitRight.text.name);
    this.unitRight.layer.add(this.unitRight.text.hp);
    this.unitRight.layer.add(this.unitRight.text.unitComp);
    this.unitRight.layer.add(this.unitRight.text.secondaryComp);
    this.stageRight.add(this.unitRight.layer);

    this._intervalTimer = setInterval(function() {
        self.updateTimer();
    }, 1000);
};

UI.prototype.authenticate = function() {
    //Idea--
    //Background zoomed in spinning while idle (Maybe initial titlescreen). Once clicked, login fades away, the camera zooms and spins out, then the tiles start fading to different colors (either randomly or in patterns--maybe even to music?) and displays "Authenticating...", then "Authenticating" fades and the tiles light up to the map from server.
    //$('#modalLogin').style.display = 'none';
    var self = this;
    authService.authenticate({
        username: $("#username").value,
        password: $("#password").value,
        onSuccess: function() {
            //Hide login
            $('#modalLogin').style.display = 'none';

            //Get initial state
            //game = new Game();
            //This needs to block before the if and .draw
            /* below will work or the UI needs to draw based on the
               properties of the battlefield object and wait for it to
               populate before drawing, which actually makes more sense.
            */
            GameState.init(function () {
                
                // show
                self.showMessage({
                    message: 'Welcome ' + GameState.player
                });
            
                //
                if (GameState.player == "atkr") {
                    self.unitLeft.shape.setFill(colors_assignment[2]);
                } else {
                    self.unitLeft.shape.setFill(colors_assignment[1]);
                }
                self.unitLeft.layer.draw();
                Field.update();
                
                // start updating
                _intervalUpdateState = setInterval(function() {
                    GameState.update();
                    Field.update();
                }, 1000);
            });
        },
        onFail: function() {
            alert('Authentication failed.');
        }
    });
};

UI.prototype.setSize = function(width, height) {
    this.stageLeft.setSize(width, height);
    this.update();
};

UI.prototype.clear = function() {

};

UI.prototype.update = function() {
    this.clear();
    this.stageLeft.draw();
    this.stageRight.draw();
};

UI.prototype.setLeftUnit = function(unit, unitId) {
    //Get stats
    if (unit) {
        if (unit.scient) {
            var name = "Name: " + unit.scient.name;
            var hp = "HP: " + GameState.HPs[unitId];
            var unitComp = "Comp: \n" + "E:" + unit.scient.comp.Earth + " " + "F:" + unit.scient.comp.Fire + " " + "I:" + unit.scient.comp.Ice + " " + "W:" + unit.scient.comp.Wind;
            var weaponType = "";
            if (unit.scient.weapon.bow) {
                weaponType = "Bow";
            }
            if (unit.scient.weapon.glove) {
                weaponType = "Glove";
            }
            if (unit.scient.weapon.wand) {
                weaponType = "Wand";
            }
            if (unit.scient.weapon.sword) {
                weaponType = "Sword";
            }
            var secondaryComp = "Weapon: " + weaponType + "\n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + "F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " + "I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " + "W:" + unit.scient.weapon_bonus.stone.comp.Wind;
        }
        unitId = GameState.getUnitIdByContents(unit);
        if (GameState.owners[unitId] == "atkr") {
            //UI.unitLeft.shape.setFill(colors_assignment[2]);
        } else {
            //UI.unitLeft.shape.setFill(colors_assignment[1]);
        }
    } else {
        var name = "";
        var hp = ""
        var unitComp = "";
        var secondaryComp = "";

        //UI.unitLeft.shape.setFill(colors_assignment[0]);
    }

    this.unitLeft.text.name.setText(name);
    this.unitLeft.text.hp.setText(hp);
    this.unitLeft.text.unitComp.setText(unitComp);
    this.unitLeft.text.secondaryComp.setText(secondaryComp);
    this.unitLeft.layer.draw();
    //console.log(unit);
};

UI.prototype.setRightUnit = function(unit, unitId) {
    //Get stats
    if (unit) {
        if (unit.scient) {
            var name = "Name: " + unit.scient.name;
            var hp = "HP: " + GameState.HPs[unitId];
            var unitComp = "Comp: \n" + "E:" + unit.scient.comp.Earth + " " + "F:" + unit.scient.comp.Fire + " " + "I:" + unit.scient.comp.Ice + " " + "W:" + unit.scient.comp.Wind;
            var weaponType = "";
            if (unit.scient.weapon.bow) {
                weaponType = "Bow";
            }
            if (unit.scient.weapon.glove) {
                weaponType = "Glove";
            }
            if (unit.scient.weapon.wand) {
                weaponType = "Wand";
            }
            if (unit.scient.weapon.sword) {
                weaponType = "Sword";
            }
            var secondaryComp = "Weapon: " + weaponType + "\n" + "E:" + unit.scient.weapon_bonus.stone.comp.Earth + " " + "F:" + unit.scient.weapon_bonus.stone.comp.Fire + " " + "I:" + unit.scient.weapon_bonus.stone.comp.Ice + " " + "W:" + unit.scient.weapon_bonus.stone.comp.Wind;
        }
        unitId = GameState.getUnitIdByContents(unit);
        if (GameState.owners[unitId] == "atkr") {
            this.unitRight.shape.setFill(colors_assignment[2]);
        } else {
            this.unitRight.shape.setFill(colors_assignment[1]);
        }
        //draw unitRight
    } else {
        var name = "";
        var hp = ""
        var unitComp = "";
        var secondaryComp = "";

        this.unitRight.shape.setFill(colors_assignment[0]);
    }

    this.unitRight.text.name.setText(name);
    this.unitRight.text.hp.setText(hp);
    this.unitRight.text.unitComp.setText(unitComp);
    this.unitRight.text.secondaryComp.setText(secondaryComp);
    this.unitRight.layer.draw();
    //console.log(unit);
};

UI.prototype.setMoveable = function(x, y, targetUnit) {
    //Clear all moveable tiles
    for (var i = 0; i < 16; i++) {
        for (var j = 0; j < 16; j++) {
            if (GameState.grid.tiles[i][j].tile.contents == "movable" || GameState.grid.tiles[i][j].tile.contents == "attackable") GameState.grid.tiles[i][j].tile.contents = null;
        }
    }

    range = 0;
    if (targetUnit) {
        targetUnit = GameState.getUnitById(GameState.getUnitIdByName(targetUnit));
        if (targetUnit.scient) targetUnit = targetUnit.scient;
        if (targetUnit.nescient) targetUnit = targetUnit.nescient;

        //TODO use defs.js battlefield object. battleField.range.indexOf(weapon) > -1;
        if (targetUnit.weapon) {
            //DOT -- ['Glove', 'Firestorm', 'Icestorm',  'Blizzard',   'Pyrocumulus']
            if (targetUnit.weapon.glove || targetUnit.weapon.firestorm || targetUnit.weapon.icestorm || targetUnit.weapon.blizzard || targetUnit.weapon.pyrocumulus) range = 4;

            //Ranged -- ['Bow',   'Magma',     'Firestorm', 'Forestfire', 'Pyrocumulus']
            if (targetUnit.weapon.bow || targetUnit.weapon.magma || targetUnit.weapon.firestorm || targetUnit.weapon.forestfire || targetUnit.weapon.pyrocumulus) range = 4;

            //AOE -- ['Wand',  'Avalanche', 'Icestorm',  'Blizzard',   'Permafrost']
            if (targetUnit.weapon.wand || targetUnit.weapon.avalanche || targetUnit.weapon.icestorm || targetUnit.weapon.blizzard || targetUnit.weapon.permafrost) range = 16;

            //Full -- ['Sword', 'Magma', 'Avalanche', 'Forestfire', 'Permafrost']
            if (targetUnit.weapon.sword || targetUnit.weapon.magma || targetUnit.weapon.avalanche || targetUnit.weapon.forestfire || targetUnit.weapon.permafrost) range = 16;
        }
    }

    if (range) {
        //Fill all move tiles
        for (var i = x - range; i <= x + range; i++) {
            for (var j = y - range; j <= y + range; j++) {
                if (GameState.grid.tiles[i] && GameState.grid.tiles[i][j] && GameState.grid.tiles[i][j].tile.contents == null) GameState.grid.tiles[i][j].tile.contents = "movable";
            }
        }

        //Fill all hit tiles
        for (var i = x - (range * 2); i <= x + (range * 2); i++) {
            for (var j = y - (range * 2); j <= y + (range * 2); j++) {
                if (GameState.grid.tiles[i] && GameState.grid.tiles[i][j] && GameState.grid.tiles[i][j].tile.contents == null) GameState.grid.tiles[i][j].tile.contents = "attackable";
            }
        }
    }

    Field.update();
};

UI.prototype.updateTimer = function() {
    if (GameState.start_time) {
        var startTime = new Date(new Date() - new Date(GameState.start_time));

        var minutes = (startTime.getMinutes().toString().length == 1) ? "0" + startTime.getMinutes() : startTime.getMinutes();
        var seconds = (startTime.getSeconds().toString().length == 1) ? "0" + startTime.getSeconds() : startTime.getSeconds();

        var time = minutes + ":" + seconds;
    } else {
        var time = "00:00";
    }

    if (GameState.time_left_battle) {
        var startTime = new Date(GameState.time_left_battle);

        var minutes = (startTime.getMinutes().toString().length == 1) ? "0" + startTime.getMinutes() : startTime.getMinutes();
        var seconds = (startTime.getSeconds().toString().length == 1) ? "0" + startTime.getSeconds() : startTime.getSeconds();

        var timeLeftBattle = minutes + ":" + seconds;
    } else {
        var timeLeftBattle = "00:00";
    }

    if (GameState.time_left_ply) {
        var startTime = new Date(GameState.time_left_ply);

        var minutes = (startTime.getMinutes().toString().length == 1) ? "0" + startTime.getMinutes() : startTime.getMinutes();
        var seconds = (startTime.getSeconds().toString().length == 1) ? "0" + startTime.getSeconds() : startTime.getSeconds();

        var timeLeftPly = minutes + ":" + seconds;
    } else {
        var timeLeftPly = "00:00";
    }

    this.timer.text.time.setText(time);
    this.timer.text.timeLeftBattle.setText(timeLeftBattle);
    this.timer.text.timeLeftPly.setText(timeLeftPly);

    this.timer.text.action.setText("Whose Action? " + GameState.whose_action);
    this.timer.text.actionNo.setText("Action # " + GameState.action_count);
    this.timer.text.turn.setText("Turn #" + GameState.turn_no);
    //this.timer.text.ply.setText("Ply # " + GameState.ply_no);
    this.timer.text.player.setText("Player: " + GameState.player);

    this.timer.layer.draw();
};

UI.prototype.showConfirm = function(args) {
    var header = args.header || "Binary Tactics";
    var message = args.message || "Are you sure?";
    this._modalCallback = args.onconfirm;

    //Hide login
    $('#modalConfirmHeader').innerHTML = header;
    $('#modalConfirmMessage').innerHTML = message;

    $('#modalNo').innerHTML = 'Yes';
    $('#modalNo').innerHTML = 'No';

    $('#modalYes').style.display = '';
    $('#modalNo').style.display = '';
    $('#modalConfirm').style.display = 'block';
};

UI.prototype.showMessage = function(args) {
    var header = args.header || "Binary Tactics";
    var message = args.message || "Hello World.";
    this._modalCallback = args.callback;

    //Hide login
    $('#modalConfirmHeader').innerHTML = header;
    $('#modalConfirmMessage').innerHTML = message;

    $('#modalNo').innerHTML = '';
    $('#modalNo').innerHTML = 'OK';

    $('#modalYes').style.display = 'none';
    $('#modalNo').style.display = '';
    $('#modalConfirm').style.display = 'block';
};

UI.prototype.modalYes = function() {
    if (this._modalCallback) this._modalCallback();
    $('#modalConfirm').style.display = 'none';
};

UI.prototype.modalNo = function() {
    $('#modalConfirm').style.display = 'none';
};
