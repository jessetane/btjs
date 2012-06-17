//Should we use canvas or DOM?

function UI(canvas){
	var ui = this;
	
	this.canvas = canvas;
	
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
	
	var draw = this.draw = function(){
		Field.draw(this.canvas);	
	}
}


//Functions
function login(){
	//Idea--
	//Background zoomed in spinning while idle (Maybe initial titlescreen). Once clicked, login fades away, the camera zooms and spins out, then the tiles start fading to different colors (either randomly or in patterns--maybe even to music?) and displays "Authenticating...", then "Authenticating" fades and the tiles light up to the map from server.
	//$('#modalLogin').style.display = 'none';
	
	cyclone.login({
		username: $("#username").value,
		password: $("#password").value, 
		onSuccess: function(){
			alert('login successful');
			$('#modalLogin').style.display = 'none';
		},
		onFail: function(){
			alert('login failed.');
		}
	});
}