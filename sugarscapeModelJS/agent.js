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
        this.v = vision || floor(random(1, 2));
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
        rect(x * r,y * r, r * 0.75, r * 0.75);
        //if mouse over show the agent vision
        //add also agent infos maxAge whealt etc.
        if (dist(mouseX, mouseY,x * r,y * r) < 5) {
            fill(0, 200, 255, 150);
            for (let i = -this.v; i <= this.v; i++) {
                //wrap around with modulo
                let posX = (i + x + cols) % cols;
                rect(posX * r, y * r, r * 0.65, r * 0.65);
                let posY = (i + y + rows) % rows;
                rect(x * r,posY * r, r * 0.65, r * 0.65);
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
    // /**
    //  * Move the agent to the nearest sugar field with the greatest sugar amount
    //  * @param {SugarScape} sugarScape SugarScape Object
    //  */
    // move(sugarScape) {
    //     //search the empty spots
    //     let emptySpots = [];
    //     for (let i = - this.v; i <= this.v; i++) {
    //         //wrap around with modulo
    //         let posX = (i + this.x + sugarScape.cols) % sugarScape.cols;
    //         let posY = (i + this.y + sugarScape.rows) % sugarScape.rows;
    //         //we find the empty spots in the agent grid
    //         if (sugarScape.agents[posX][posY] == null) emptySpots.push(createVector(posX, posY));
    //     }
    //     //search the sugarfields with the highest amout of sugar
    //     let max = -1;
    //     let sugarSpots = [];
    //     for (let spot of emptySpots) {
    //         let sugarAmount = sugarScape.sugarFields[spot.x][spot.y].sugarAmount;
    //         if (sugarAmount >= max) {
    //             max = sugarAmount;
    //             // sugarSpots.push(createVector(spot.x, spot.y));
    //         }
    //     }
    //     for (let spot of emptySpots) {
    //         let sugarAmount = sugarScape.sugarFields[spot.x][spot.y].sugarAmount;
    //         if (sugarAmount >= max) sugarSpots.push(createVector(spot.x, spot.y));
    //     }
    //     // console.log([sugarSpots, max]);
    //     //search the nearest sugar field
    //     let min = 9999999;
    //     let nearestSpot;
    //     let nearestSpots = [];
    //     for (let spot of sugarSpots) {
    //         let pos = createVector(this.x, this.y);
    //         let d = p5.Vector.dist(pos, spot);
    //         //get the nearest sugarfield
    //         if (d <= min) {
    //             min = d;
    //         }
    //     }
    //     for (let spot of sugarSpots) {
    //         let pos = createVector(this.x, this.y);
    //         let d = p5.Vector.dist(pos, spot);
    //         //push the position in a vector array
    //         if (d <= min)nearestSpots.push(createVector(spot.x, spot.y));
    //     }
    //     //if there is more than one position get a random position
    //     if (nearestSpots.length > 1) nearestSpot = random(nearestSpots);
    //     else nearestSpot = createVector(this.x, this.y);
    //     this.x = nearestSpot.x;
    //     this.y = nearestSpot.y;
    //     this.wealth += sugarScape.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount;
    //     sugarScape.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount = 0;
    //     this.wealth -= this.MR;
    //     this.age++;
    // }
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