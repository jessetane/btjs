var Field = {

    stage: undefined,
    
    scale: 25,
    
    setSize: function(width, height){
        Field.stage.setSize(width, height);
        Field.update();
    },
    
    tileLayer: new Kinetic.Layer(),
    tiles: [],
    
    indicatorLayer: new Kinetic.Layer(),
    indicator: undefined,
    
    init: function(){		    	
        Field.stage = new Kinetic.Stage({
            container: "field", 
            width: 768, 
            height: 768
        }); 
        
        Field.indicator = new Kinetic.RegularPolygon({
			name: "indicator",
			x: 0,
			y: 0,
			sides: 6,
			radius: Field.scale,
			fill: 'rgba(255,255,255,0.25)',
			stroke: 'rgba(255,255,255,0.25)',
			strokeWidth: 1
		});
				
		Field.indicator.on("mousedown", function(){
			Field.indicator.setFill('rgba(0,0,0,0.25)');
			Field.indicator.show();
			Field.indicatorLayer.draw();
		});
		
		Field.indicator.on("mouseup", function(){
			Field.indicator.setFill('rgba(255,255,255,0.5)');
			Field.indicator.show();
			Field.indicatorLayer.draw();
		});
		
		Field.indicator.on("click", function(){
			if(Field.indicator.tileIndex && Field.onTileClick) Field.onTileClick.apply(Field.indicator, [Field.indicator.tileIndex]);
		});
		
		Field.indicator.on("mouseout", function(){
			Field.hideIndicator();
		});
		
		Field.indicatorLayer.add(Field.indicator);
		
        Field.stage.add(Field.tileLayer);
        Field.stage.add(Field.indicatorLayer);
    },
    
    clear: function(){
        Field.tileLayer.removeChildren();
    },
    
    update: function(){
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
                tiles[i][j] = new Field.Tile([i, j], [(x + (1 - width / 2)), (y + (1 - height / 2))]);
                
                Field.tileLayer.add(tiles[i][j].shapes);
                //var o = occupancy[i + (j * 16)];
                
                if(GameState.grid && GameState.grid.tiles[i][j].tile.contents != null){
                	if(GameState.getUnitIdByContents(GameState.grid.tiles[i][j].tile.contents)){
                		var unitId = GameState.getUnitIdByContents(GameState.grid.tiles[i][j].tile.contents)
	                    
	                    if(GameState.units[unitId].scient)  o = 1;
	                    if(GameState.units[unitId].nescient) o = 2;
	                    
	                    if(GameState.owners[unitId] == "atkr") o += 6;
                	}else{
                		switch(GameState.grid.tiles[i][j].tile.contents){
                			case 'movable':
                				o = 104;
                				break;	
                			case 'attackable':
                				o = 103;
                				break;
                			default:
                				o = 0;
                				break;
                		}
					}
                }else{
                    o = 0;
                }
                
                
                if(o < 6){
                    tiles[i][j].shapes.get(".background")[0].setFill(colors_assignment_bg_white[o]);
                    tiles[i][j].shapes.get(".foreground")[0].setFill(colors_assignment[o]);
                }else if(o < 100){
                    tiles[i][j].shapes.get(".background")[0].setFill(colors_assignment_bg_black[o - 5]);
                    tiles[i][j].shapes.get(".foreground")[0].setFill(colors_assignment[o - 5]);
                }else{
                    tiles[i][j].shapes.get(".background")[0].setFill(colors_assignment_bg_black[o - 100]);
                    tiles[i][j].shapes.get(".foreground")[0].setFill(colors_assignment[o - 100]);
                }
            }
        }
        Field.stage.draw();
    },
    
    Tile: function (index, position){

		var x = position[0] * Field.scale + (Field.stage.getWidth() / 2);
		var y = position[1] * Field.scale + (Field.stage.getHeight() / 2);

		this.index = index;
		this.position = [x, y];

		this.shapes = new Kinetic.Group();
		this.shapes.add(new Field.CustomHex('background', x, y, 1.0 * Field.scale, 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.15)', 2, 'lighter'));
		this.shapes.add(new Field.CustomHex('foreground', x, y, 0.8 * Field.scale, 'rgba(255,255,255,0.1)', 'rgba(255,255,255,0.15)', 1, 'lighter'));

		this.shapes.on("mouseover", function() {
			Field.showIndicator(index, x, y);
			if(Field.onTileOver) Field.onTileOver.apply(this, [index]);
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
			drawFunc: function(context) {
				context.globalCompositeOperation = composite;
				context.beginPath();
				context.moveTo(0, 0 - this.attrs.radius);
				
				for(var n = 1; n < this.attrs.sides; n++) {
					var x = this.attrs.radius * Math.sin(n * 2 * Math.PI / this.attrs.sides);
					var y = -1 * this.attrs.radius * Math.cos(n * 2 * Math.PI / this.attrs.sides);
					context.lineTo(x, y);
				}
				context.closePath();
				this.fill(context);
				this.stroke(context);
			}
		});    	
	},
	
	showIndicator: function(index, x, y){
		Field.indicator.tileIndex = index;
		Field.indicator.setPosition(x, y);
		Field.indicator.setFill('rgba(255,255,255,0.25)');
		Field.indicator.show();
		Field.indicatorLayer.draw();
		//console.log("Show Tile Indicator: %d %d", x , y);
	},
	
	hideIndicator: function(){
		Field.indicator.tileIndex = undefined;
		Field.indicator.hide();
		Field.indicatorLayer.draw();
		//console.log("Hide Tile Indicator");
	}
}
