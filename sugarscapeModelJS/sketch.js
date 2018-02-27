///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const rows = cols = 7;
const leftGutter = 50, topGutter = 20;
///////////////////////////////////////
///////////////////////////////////////
let sc;
function setup() {
	createCanvas(800, 800);
	rectMode(CENTER);
	sc = new SugarScape(10, 15, 2);
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
	sc.show();
}