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
	// sc.show();
	if (frameCount % 30 == 0) {
		//we update the sugarscape according to the paper
		sc.grow();//grow the sugar
		sc.move();//move the agent
		sc.replace();//replace dead agents
	}
	sc.show();
}