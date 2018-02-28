///////////////////////////////////////
////////////global variables///////////
///////////////////////////////////////
const maxSugarCapacity = 4;
const rows = cols = 10;
const leftGutter = 50, topGutter = 20;
///////////////////////////////////////
///////////////////////////////////////
let sc, cnv;
function setup() {
	cnv = createCanvas(800, 800);
	cnv.parent('myCanvas')
	ellipseMode(CORNER);
	sc = new SugarScape(20, 25, 2);
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