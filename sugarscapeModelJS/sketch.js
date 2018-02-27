///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const rows = cols = 20;
const leftGutter = 50, topGutter = 20;
///////////////////////////////////////
///////////////////////////////////////
let sc;
function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	sc = new SugarScape(50, 15, 2);
}

function draw() {
	background(0);
	if(frameCount % 10 == 0)sc.update();
	sc.show();
}