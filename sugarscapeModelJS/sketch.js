///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const ROWS = COLS = 50;
const GUTTER = 20;
///////////////////////////////////////
///////////////////////////////////////
let sc, cnv, debug = false;
function setup() {
	let cnvDiv = document.getElementById('myContainer');
	cnv = createCanvas(800, 800);
	cnv.parent('myCanvas');

	console.log(cnvDiv.offsetWidth);
	let w = cnvDiv.offsetWidth;
	let h = cnvDiv.offsetHeight;
	
	rectMode(CENTER);
	sc = new SugarScape(250, 15, 2);
}


function mouseClicked(){
	//we update the sugarscape according to the paper
	sc.grow();//grow the sugar
	sc.move();//move the agent
	sc.replace();//replace dead agents
}
function draw() {
	background(0);
	// sc.show();
	// if (frameCount % 30 == 0) {
	// 	//we update the sugarscape according to the paper
	// 	sc.grow();//grow the sugar
	// 	sc.move();//move the agent
	// 	sc.replace();//replace dead agents
	// }
	translate(GUTTER, GUTTER);
	sc.show();
	if(debug)sc.displayDebug();
}