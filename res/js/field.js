function Field(canvas, uiCanvas, inputCanvas){
	var field = this;
	
	this.canvas = canvas;
	this.uiCanvas = uiCanvas;
	this.inputCanvas = inputCanvas;
	var context = this.context = canvas.getContext("2d");
	var uiContext = this.uiContext = uiCanvas.getContext("2d");
	var center = this.center = $V([canvas.width / 2, canvas.height / 2]);
	
	var ghostCanvas = this.ghostCanvas = document.createElement('canvas');
	ghostCanvas.height = canvas.height; ghostCanvas.width = canvas.width;
	var ghostContext = this.ghostContext = ghostCanvas.getContext("2d");
	
	var unit = this.unit = 25;
	var trig = this.trig = {
		a: Math.sqrt(3)/2,
		b: 1/2,
		c: 1
	};
	
	this.width = 33 * trig.a;
	this.height = (17 * trig.b) + 16;
	this.tilt = 0;
	this.rotation = 0;
	this.zoom = 1;
	
	var hex = this.hex = [
		$V([0,1]),
		$V([trig.a, trig.b]),
		$V([trig.a,-trig.b]),
		$V([0,-1]),
		$V([-trig.a,-trig.b]),
		$V([-trig.a,trig.b])
	];
	
	var Shape = this.Shape = function(){
		this.strokeStyle = 'rgba(255,255,255,0.15)';
		this.fillStyle = 'rgba(255,255,255,0.1)';
		this.lineWidth = '1';
		
		this.vertices = hex;	
		
		this.scale = 1;
	}
	
	var Tile = this.Tile = function(index, position){
		this.index = index;
		this.position = position;
		
		this.shapes = [new Shape(), new Shape(), new Shape()];
		
		this.shapes[0].lineWidth = 2;
		
		this.shapes[1].scale = 0.6;
		
		this.shapes[2].scale = 0.0;
		
		this.click = function(){
			this.shapes[0].fillStyle = 'rgba(255,255,255,1)';
			this.shapes[1].fillStyle = 'rgba(255,255,255,1)';
			draw();
		};
	};
	
	var tiles = this.tiles = [];
	for(var i = 0; i < 16; i++){
		if(!tiles[i]) tiles[i] = [];
		for(var j = 0; j < 16; j++){
			var x =  (i * (2 * trig.a)) + ((j % 2) * trig.a);
			var y =  (j * (3 * trig.b));
			var position = $V([x, y]).add([1 - field.width/2, 1 - field.height/2]);
			tiles[i][j] = new Tile([i, j], position);
			
			var o = occupancy[i + (j * 16)];
			
			if(o < 6){
				tiles[i][j].shapes[0].fillStyle = colors_assignment_bg_white[o];
				tiles[i][j].shapes[1].fillStyle = colors_assignment[o];
				tiles[i][j].shapes[2].fillStyle = colors_assignment[o];
			}else{
				tiles[i][j].shapes[0].fillStyle = colors_assignment_bg_black[o - 5];
				tiles[i][j].shapes[1].fillStyle = colors_assignment[o - 5];
				tiles[i][j].shapes[2].fillStyle = colors_assignment[o - 5];
			}
		}
	}
	
	this.getTile = function(x, y){
		return tiles[x][j];
	};
	
	var StatBubble = this.StatBubble = function(position){
		this.position = position;
		this.shapes = [new Shape(), new Shape()];
		
		this.shapes[0].scale = 6;
		this.shapes[1].scale = 4;
		
		//this.shapes[0].fillStyle = 'rgba(255,255,255,0.2)';
		//this.shapes[1].fillStyle = 'rgba(255,255,255,0.2)';
	}
	
	var position = $V([3, 2]);//.add([1 - field.width/2, 1 - field.height/2]);
	var statBubble = this.StatBubble = new StatBubble(position);
	
	var draw = this.draw = function(){
		requestAnimFrame(function(){
			clearCanvas();
			clearCanvas(uiCanvas, uiContext, true);
			
			// set composite property
    		context.globalCompositeOperation = 'lighter';
					
			for(var i = 0; i < tiles.length; i++){
				for(var j = 0; j < tiles[i].length; j++){
					drawTile(tiles[i][j]);
				}
			}
			
			drawTile(statBubble, uiContext);
		});
	};
	
	var clearCanvas = this.clearCanvas = function(cnvs, ctx, staticPosition){
		cnvs = cnvs || canvas;
		ctx = ctx || context;
		ctx.clearRect(0, 0, cnvs.width, cnvs.height);
		cnvs.width = cnvs.width;
				
		if(!staticPosition){
			var cs = Math.cos(field.rotation), sn = Math.sin(field.rotation);
			var h = Math.cos(field.tilt);
			var a = field.zoom*cs, b = -field.zoom*sn;
			var d = h*field.zoom*sn, e = h*field.zoom*cs;
			
			ctx.setTransform(a, d, b, e, field.center.x, field.center.y);
		}
	};
	
	function clearGhost(){
		ghostContext.clearRect(0, 0, canvas.width, canvas.height);
		ghostCanvas.width = ghostCanvas.width;
		
		var cs = Math.cos(field.rotation), sn = Math.sin(field.rotation);
		var h = Math.cos(field.tilt);
		var a = field.zoom*cs, b = -field.zoom*sn;
		var d = h*field.zoom*sn, e = h*field.zoom*cs;
		
		ghostContext.setTransform(a, d, b, e, field.center.x, field.center.y);
	}
	
	var drawTile = this.drawTile = function(tile, ctx){
		ctx = ctx || context;
				
		for(var j = 0; j < tile.shapes.length; j++){
			var vertices = tile.shapes[j].vertices;
			var end = vertices[vertices.length - 1].multiply(tile.shapes[j].scale);

			ctx.strokeStyle = tile.shapes[j].strokeStyle;
			ctx.fillStyle = tile.shapes[j].fillStyle; 
			ctx.lineWidth = tile.shapes[j].lineWidth;
			
			ctx.beginPath();
			ctx.moveTo(unit * (tile.position.x + end.x), unit * (tile.position.y + end.y));
			for(var k = 0; k < vertices.length; k++){
				var vertex = vertices[k].multiply(tile.shapes[j].scale);
				ctx.lineTo(unit * (tile.position.x + vertex.x), unit * (tile.position.y + vertex.y));
			}
			ctx.fill();
			
			if(tile.shapes[j].lineWidth > 0) ctx.stroke();
		}
	};
	
	//Mouse Events	
	function objectByPoint(point){
		clearCanvas(ghostCanvas, ghostContext);
		for(var i = 0; i < tiles.length; i++){
			for(var j = 0; j < tiles[i].length; j++){
				drawTile(tiles[i][j], ghostContext);
				
				var imageData = ghostContext.getImageData(point.x, point.y, 1, 1);
				var index = (point.x + point.y * imageData.width) * 4;
				
				if(imageData.data[3] > 0) {
					return tiles[i][j];
				}
			}
		}
		return false;
	}
	
	var leftMouseIsDown = false;
	var rightMouseIsDown = false;
	var startDrag;
	function onMouseDown(e){
		if(e.button == 0) leftMouseIsDown = true;
		if(e.button == 2) rightMouseIsDown = true;
		startDrag = $V([e.offsetX, e.offsetY]);
	}
	
	function onMouseUp(e){
		if(e.button == 0) leftMouseIsDown = false;
		if(e.button == 2) rightMouseIsDown = false;
	}
	
	function onClick(e){
		var object = objectByPoint($V([e.offsetX, e.offsetY]));
		
		if(object && object.click){
			object.click.apply(object, [e]);
		}
	}
	
	function onMouseOver(e){
		
	}
	
	function onMouseOut(e){
		
	}
	
	var highlightedTile;
	function highlightTile(tile){
		return false;
		if(highlightedTile) delightTile(highlightedTile);
		
		tile.shapes[0].fillStyle = colors.purple;
		drawTile(tile);
		
		highlightedTile = tile;
	}
	
	function delightTile(tile){
		return false;
		var o = occupancy[tile.index[0] + (tile.index[1] * 16)];
		
		if(o < 6){
			tile.shapes[0].fillStyle = colors_assignment_bg_white[o];
			tile.shapes[1].fillStyle = colors_assignment[o];
		}else{
			tile.shapes[0].fillStyle = colors_assignment_bg_black[o - 5];
			tile.shapes[1].fillStyle = colors_assignment[o - 5];
		}
		
		//drawTile(tile);
		draw();
	}
	
	function onMouseMove(e){
		if(rightMouseIsDown){			
			field.rotation = (startDrag.x - e.offsetX)/150;
			field.rotation = (Math.round(field.rotation * 100) % ((Math.PI * 2) * 100)) / 100;
			
			field.tilt = (startDrag.y - e.offsetY)/150;
			field.tilt = (Math.round(field.tilt * 100) % ((Math.PI * 2) * 100)) / 100;
			draw();
		} else {
			var object = objectByPoint($V([e.offsetX, e.offsetY]));
			if(object) highlightTile(object);
		}
	}
	
	function onMouseWheel(e){
		field.zoom = ((e.wheelDeltaY > 0)?field.zoom * 2: field.zoom / 2);
		if(field.zoom > 128) field.zoom = 128;
		if(field.zoom < 0.125) field.zoom = 0.125;
		draw();
	}

	inputCanvas.addEventListener('click', onClick, false);
	inputCanvas.addEventListener('mousedown', onMouseDown, false);
	inputCanvas.addEventListener('mouseup', onMouseUp, false);
	
	inputCanvas.addEventListener('mouseover', onMouseOver, false);
	inputCanvas.addEventListener('mouseout', onMouseOut, false);
	inputCanvas.addEventListener('mousemove', onMouseMove, false);
	inputCanvas.addEventListener('mousewheel', onMouseWheel, false);
			
}

//rAF with TimeoutFallback
window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();
