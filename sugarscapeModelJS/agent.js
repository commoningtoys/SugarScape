class Agent {
    /**
     * Constructor of the Agent Object
     * @param {int} x initial position on x axis
     * @param {int} y initial position on y axis
     * @param {int} vision depth of view
     * @param {int} metabolicRate speed by which the agent cosumes his sugar
     * @param {int} maxAge maximum age an agent can live
     */
    constructor(vision, metabolicRate, maxAge) {
        // this.x = x;
        // this.y = y;
        this.v = vision || floor(random(1, 4));
        this.MR = metabolicRate || floor(random(1, 5));
        this.MA = maxAge || floor(random(60, 101));
        this.age = 0;
        this.wealth = floor(random(5, 26));
    }
    /**
     * show the agent
     * @param {int} r size of agent
     */
    show(x, y, r) {
        // stroke(255);
        noStroke();
        fill(255, 0, 255, 150);
        rect(x * r, y * r, r * 0.75, r * 0.75);
        //if mouse over show the agent vision
        //add also agent infos maxAge whealt etc.
        if (dist(mouseX - GUTTER, mouseY - GUTTER, x * r, y * r) < 5) {
            fill(0, 200, 255, 150);
            for (let i = -this.v; i <= this.v; i++) {
                //wrap around with modulo
                let posX = (i + x + COLS) % COLS;
                rect(posX * r, y * r, r * 0.65, r * 0.65);
                let posY = (i + y + ROWS) % ROWS;
                rect(x * r, posY * r, r * 0.65, r * 0.65);
            }
        }
    }
    /**
     * 
     * @param {int} val Sugar amount to be added to the total wealth
     */
    update(val) {
        this.wealth += val;
        this.wealth -= this.MR;
        this.age++;
    }
}

//wrap around code
//outer grid loop
// let columns = 30, ROWS = 30, num = 10;
// for (let j = 0; j < ROWS; j++) {
//     for (let i = 0; i < columns; i++) {
//         //inner convolution loop
//         for (let y = -num; y <= num; y++) {
//             for (let x = -num; x < num; x++) {
//                 //we use modulo to wrap around
//                 let col = (i + x + columns) % columns;
//                 let row = (j + y + ROWS) % ROWS;
//                 console.log([col, row])
//             }
//         }
//     }
// }