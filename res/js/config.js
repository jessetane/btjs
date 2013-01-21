/*
var occupancy = [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,9,8,10,0,0,0,0,0,0,
		0,0,0,0,0,0,0,6,6,7,0,0,0,0,0,0,
		 0,0,0,0,0,0,6,6,7,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,
		0,0,0,0,0,0,0,0,2,1,1,2,0,0,0,0,
		 0,0,0,0,0,0,0,2,1,1,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,3,3,4,4,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	]

	
var colors = {
	red: "#C82F27",
	blue: "#2b9bc4",  //4091af
	green: "#5bcb49",
	yellow: "#f0f250",
	purple: "#9866dc",
	
	light_red: "#f4c7c4",
	light_blue: "#9ee4fd",
	light_green: "#cbfac3",
	light_yellow: "#fcfccc",
	light_purple: "#ecdffc",
	
	dark_red: "#340c0a",
	dark_blue: "#011720",
	dark_green: "#082503",
	dark_yellow: "#2b2b03",
	dark_purple: "#1a0534"
};
	*/
var occupancy = [
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,
		0,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,
		 0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,
		0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,
		 0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,
		0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
		 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
	]
	
var colors = {
	gray: "rgba(92,92,92,1)",
	red: "rgba(133,0,0,1)",
	blue: 'rgba(46,97,154,1)', //4091af
	green: "#5bcb49",
	yellow: "#f0f250",
	purple: "#9866dc",
	
	trans_gray: "rgba(92,92,92,0.2)",
	trans_red: "rgba(133,0,0,0.2)",
	trans_blue: 'rgba(46,97,154,0.2)',
	trans_green: "#cbfac3",
	trans_green: "rgba(91,203,73,0.35)",
	trans_yellow: "#fcfccc",
	trans_purple: "#ecdffc",
	
	light_red: "rgba(255,0,0,0.2)",
	light_blue: "rgba(31,69,128,1)",
	light_green: "#cbfac3",
	light_yellow: "#fcfccc",
	light_purple: "#ecdffc",
	
	dark_red: "#340c0a",
	dark_blue: "rgba(46,97,154,1)",
	dark_green: "#082503",
	dark_yellow: "#2b2b03",
	dark_purple: "#1a0534"
};

var colors_assignment = [colors.trans_gray, colors.trans_red, colors.trans_blue, colors.green, colors.yellow, colors.purple];
var colors_assignment_bg_white = [colors.gray, colors.red, colors.blue, colors.light_green, colors.light_yellow, colors.light_purple];
var colors_assignment_bg_black = [colors.gray, colors.red, colors.blue, colors.dark_green, colors.dark_yellow, colors.dark_purple];
var colors_assignment_stroke = [colors.gray, colors.red, colors.light_blue, colors.green, colors.yellow, colors.purple];
