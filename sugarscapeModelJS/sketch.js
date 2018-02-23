///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const rows = cols = 50;
const leftGutter = 50, topGutter = 20;
///////////////////////////////////////
///////////////////////////////////////
let sc;
function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	sc = new SugarScape(6, 15, 2);
}

function draw() {
	background(0);
	sc.show();
}