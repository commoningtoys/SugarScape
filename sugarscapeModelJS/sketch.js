///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const ROWS = COLS = 50;
const GUTTER = 20;
///////////////////////////////////////
///////////////////////////////////////
/**
 * 
 * @returns the minimum between width and height of the contained div
 */
function minimum(){
	let cnvDiv = document.getElementById('myContainer');
	let w = cnvDiv.offsetWidth;
	let h = cnvDiv.offsetHeight;
	if(w < h) return w;
	else return h;
}
/**
 * 
 * @param {value} dimension the width / height of the grid
 * @returns the radius of the single cells
 */
function radius(dimension){
	let availableWidth = dimension - (2 * GUTTER);
	return availableWidth / COLS;
}
let sc, cnv, debug = false;
function setup() {
	let canvasDimension = minimum();
	cnv = createCanvas(canvasDimension, canvasDimension);
	cnv.parent('myCanvas');
	rectMode(CENTER);
	sc = new SugarScape(250, radius(canvasDimension), 2);
}


// function mouseClicked(){
// 	//we update the sugarscape according to the paper
// 	sc.grow();//grow the sugar
// 	sc.move();//move the agent
// 	sc.replace();//replace dead agents
// }
function draw() {
	background(0);
	translate(GUTTER, GUTTER);
	if (frameCount % 10 == 0) {
		//we update the sugarscape according to the paper
		sc.grow();//grow the sugar
		sc.move();//move the agent
		sc.replace();//replace dead agents
	}
	sc.show();
	if(debug)sc.displayDebug();
}

function resizeSketch(){
	let canvasWidth = minimum();
	resizeCanvas(canvasWidth, canvasWidth);
	sc.setResolution(radius(canvasWidth));
}