var Field = {

    stage: undefined,
    
    scale: 25,
    tilt: 0,
    rotation: 0,
    zoom: 1,
    
    setSize: function(width, height){
        Field.stage.setSize(width, height);
        Field.draw();
    },
    
    getTransform: function(){
        var cs = Math.cos(Field.rotation), sn = Math.sin(Field.rotation);
        var h = Math.cos(Field.tilt);
        var a = Field.zoom*cs, b = -Field.zoom*sn;
        var d = h*Field.zoom*sn, e = h*Field.zoom*cs;
        
        // Field.tileLayer.getContext().setTransform(a, d, b, e, Field.stage.getWidth() / 2, Field.stage.getHeight() / 2);
        // Field.stage.clear();
        // Field.stage.draw();
        
        return [a, d, b, e, Field.stage.getWidth() / 2, Field.stage.getHeight() / 2];
    },
    
    tileLayer: new Kinetic.Layer(),
    tiles: [],
    
    init: function(){
        Field.stage = new Kinetic.Stage({
            container: "field", 
            width: 768, 
            height: 768
        });
        
        //Field.stage.setScale(Field.scale);
        //Field.tileLayer.getContext().globalCompositeOperation = 'lighter';        
        Field.stage.add(Field.tileLayer);
        
        Field.stage.on("mousemove", function(){
            var mousePos = Field.stage.getMousePosition();
            var x = mousePos.x;
            var y = mousePos.y;
            
            console.log("Mouse Coordinates x:%d y:%d", x, y);
        });
    },
    
    clear: function(){
    	Field.stage.removeChildren();
        Field.tileLayer = new Kinetic.Layer();
        Field.stage.add(Field.tileLayer);
    },
    
    draw: function(){
        Field.clear();
        
        var trig = {
            a: Math.sqrt(3)/2,
            b: 1/2,
            c: 1
        };
        
        var width = 33 * trig.a;
        var height = (17 * trig.b) + 16;
        var tiles = Field.tiles;
        
        for(var i = 0; i < 16; i++){
            tiles[i] = [];
            for(var j = 0; j < 16; j++){
                var x =  (i * (2 * trig.a)) + ((j % 2) * trig.a);
                var y =  (j * (3 * trig.b));
                var position = [(x + (1 - width / 2)), (y + (1 - height / 2))]; //$V([x, y]).add([1 - width/2, 1 - height/2]);
                tiles[i][j] = new Field.Tile([i, j], position);
                
                Field.tileLayer.add(tiles[i][j].shapes);
                //var o = occupancy[i + (j * 16)];
                
                if(GameState.grid && GameState.grid.tiles[i][j].tile.contents != null){
                    var unitId = GameState.getUnitIdByContents(GameState.grid.tiles[i][j].tile.contents)
                    
                    if(GameState.units[unitId].scient)  o = 1;
                    if(GameState.units[unitId].nescient) o = 2;
                    
                    if(GameState.owners[unitId] == "atkr") o += 6;
                }else{
                    o = 0;
                }
                
                
                if(o < 6){
                    tiles[i][j].shapes.get(".background")[0].setFill(colors_assignment_bg_white[o]);
                    tiles[i][j].shapes.get(".foreground")[0].setFill(colors_assignment[o]);
                }else{
                    tiles[i][j].shapes.get(".background")[0].setFill(colors_assignment_bg_black[o - 5]);
                    tiles[i][j].shapes.get(".foreground")[0].setFill(colors_assignment[o - 5]);
                }
                
                
                
            }
        }
        Field.stage.draw();
    },
    
    Tile: function (index, position){

		var x = position[0] * Field.scale + (Field.stage.getWidth() / 2);
		var y = position[1] * Field.scale + (Field.stage.getHeight() / 2);

		this.index = index;
		this.position = position;

		this.shapes = new Kinetic.Group();
		this.shapes.add(new Field.CustomHex('background', x, y, 1.0 * Field.scale, 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.15)', 2, 'lighter'));
		this.shapes.add(new Field.CustomHex('foreground', x, y, 0.8 * Field.scale, 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.15)', 1, 'lighter'));

		this.shapes.on("click", function() {
			this.get(".background")[0].setFill('rgba(255,255,255,1)');
			Field.stage.draw();
		});

		this.shapes.on("mouseover", function() {
			this.get(".background")[0].setFill('rgba(255,255,255,1)');
			Field.stage.draw();
		});

		this.shapes.on("mouseout", function() {
			this.get(".background")[0].setFill('rgba(255,255,255,0.1)');
			Field.stage.draw();
		}); 
        
    },
	
	CustomHex: function(name, x, y, radius, fill, stroke, strokeWidth, composite){
		return new Kinetic.Shape({
			name: name,
			x: x,
			y: y,
			sides: 6,
			radius: radius,
			fill: fill,
			stroke: stroke,
			strokeWidth: strokeWidth,
			drawFunc: function() {
				var context = this.getContext();
				context.globalCompositeOperation = composite;
				context.beginPath();
				context.moveTo(0, 0 - this.attrs.radius);
				
				for(var n = 1; n < this.attrs.sides; n++) {
					var x = this.attrs.radius * Math.sin(n * 2 * Math.PI / this.attrs.sides);
					var y = -1 * this.attrs.radius * Math.cos(n * 2 * Math.PI / this.attrs.sides);
					context.lineTo(x, y);
				}
				context.closePath();
				this.fill();
				this.stroke();
			}
		});    	
	}
}
