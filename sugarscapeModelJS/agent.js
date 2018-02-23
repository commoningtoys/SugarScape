class Agent {
    /**
     * Constructor of the Agent Object
     * @param {int} x initial position on x axis
     * @param {int} y initial position on y axis
     * @param {int} vision depth of view
     * @param {int} metabolicRate speed by which the agent cosumes his sugar
     * @param {int} maxAge maximum age an agent can live
     */
    constructor(x, y, vision, metabolicRate, maxAge) {
        this.x = x;
        this.y = y;
        this.v = vision || floor(random(1, 7));
        this.MR = metabolicRate || floor(random(1, 5));
        this.MA = maxAge || floor(random(60, 101));
        this.wealth = floor(random(5, 26));
    }
    /**
     * show the agent
     * @param {int} r size of agent
     */
    show(r) {
        // stroke(255);
        noStroke();
        fill(255, 0, 255, 150);
        rect(leftGutter + this.x * r, topGutter + this.y * r, r * 0.75, r * 0.75);
        //if mouse over show the agent vision
        //add also agent infos maxAge whealt etc.
        if (dist(mouseX, mouseY, leftGutter + this.x * r, topGutter + this.y * r) < 5) {
            fill(0, 200, 255, 150);
            for (let i = - this.v; i <= this.v; i++) {
                //wrap around with modulo
                let posX = (i + this.x + cols) % cols;
                rect(leftGutter + posX * r, topGutter + this.y * r, r * 0.65, r * 0.65);
                let posY = (i + this.y + rows) % rows;
                rect(leftGutter + this.x * r, topGutter + posY * r, r * 0.65, r * 0.65);
            }
        }
    }
    move(sugarScape) {
        //search the empty spots
        let emptySpots = [];
        for (let i = - this.v; i <= this.v; i++) {
            //wrap around with modulo
            let posX = (i + this.x + sugarScape.cols) % sugarScape.cols;
            let posY = (i + this.y + sugarScape.rows) % sugarScape.rows;
            //we find the empty spots in the agent grid
            if (sugarScape.agents[posX][posY] === null) emptySpots.push(createVector(posX, posY));
        }
        //search the sugarfields with the highest amout of sugar
        let max = 0;
        let sugarSpots = [];
        for(let spot of emptySpots){
            let sugarAmount = sugarScape.sugarFields[spot.x][spot.y].sugarAmount
            if(sugarAmount >= max){
                max = sugarAmount;
                sugarSpots.push(createVector(spot.x, spot.y));
            }
        }

        this.wealth -= this.MR;
    }
}

//wrap around code
//outer grid loop
// let columns = 30, rows = 30, num = 10;
// for (let j = 0; j < rows; j++) {
//     for (let i = 0; i < columns; i++) {
//         //inner convolution loop
//         for (let y = -num; y <= num; y++) {
//             for (let x = -num; x < num; x++) {
//                 //we use modulo to wrap around
//                 let col = (i + x + columns) % columns;
//                 let row = (j + y + rows) % rows;
//                 console.log([col, row])
//             }
//         }
//     }
// }