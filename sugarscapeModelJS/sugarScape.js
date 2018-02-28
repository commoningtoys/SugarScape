/**
 * Debugging function to draw movement lines
 * @param {p5.Vector} v1 
 * @param {p5.Vector} v2 
 */
function Debug(v1, v2) {
    this.v1 = v1;
    this.v2 = v2;
}
class SugarScape {
    constructor(numAgents, resolution, numCenters) {
        this.rows = rows;//we can make them change later
        this.cols = cols;
        /////SUGAR FIELDS///////
        this.sugarFields = [];
        this.r = resolution;
        this.fieldCenters = this.setFieldCenters(numCenters);
        this.fieldRadius = 2.5;
        ///////AGENTS////////////
        this.agents = [];
        this.agents = this.fillGridWithAgents(numAgents);
        this.initSugarFields();
        //DEBUG//
        this.debug = [];
    }
    /** 
     * initializes the model by setting the 
     * sugarfields in the grid
    */
    initSugarFields() {
        for (let x = 0; x < this.cols; x++) {
            this.sugarFields[x] = [];
            for (let y = 0; y < this.rows; y++) {
                let sum = 0;
                for (let fc of this.fieldCenters) {
                    let pos = createVector(x, y);
                    let d = p5.Vector.dist(pos, fc);
                    sum += this.fieldRadius / Math.pow(d, 0.9);
                }
                sum = this.sigmoid(sum);
                let max = Math.floor(map(sum, 0.7, 1, 0, maxSugarCapacity));
                let sf = new SugarField(max);
                this.sugarFields[x][y] = sf;
            }
        }
    }
    /**
     * function to set a number of sugar field centers
     * @param {int} num number of sugarField centers
     * @returns array of p5.Vector
     */
    setFieldCenters(num) {
        let vecArr = new Array(num);
        for (let i = 0; i < num; i++) {
            let x = Math.floor(Math.random() * this.cols);
            let y = Math.floor(Math.random() * this.rows);
            vecArr[i] = createVector(x, y);
        }
        return vecArr;
    }
    /**
     * 
     * @param {int} num number of agents to be set in the grid
     * @returns 2D Array of agents
     */
    fillGridWithAgents(num) {
        let result = [];
        for (let x = 0; x < this.cols; x++) {
            result[x] = [];
            for (let y = 0; y < this.rows; y++) {
                result[x][y] = null;
            }
        }
        let count = 0;
        //fill the array with agents
        while (count < num) {
            let x = Math.floor(Math.random() * cols);
            let y = Math.floor(Math.random() * rows);
            if (result[x][y] === null) {
                result[x][y] = new Agent();
                count++;
                // if (num <= 0) break;
                console.log(num);
            }
        }
        return result;
    }
    /** 
     * show the sugarscape
    */
    show() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                noFill();
                stroke(255);
                rect(x * this.r, y * this.r, this.r, this.r)
                this.sugarFields[x][y].show(x, y, this.r);
            }
        }
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.agents[x][y] !== null) this.agents[x][y].show(x, y, this.r)
            }
        }
        for (let d of this.debug) {
            noStroke();
            fill(255, 0, 0);
            ellipse(d.v1.x, d.v1.y, 5);
            fill(0, 0, 255);
            ellipse(d.v2.x, d.v2.y, 5);
            stroke(0, 255, 0);
            line(d.v1.x, d.v1.y, d.v2.x, d.v2.y);
        }
    }
    grow() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.sugarFields[x][y].growSugar();
            }
        }
    }
    /**
     * Move the agent to the nearest sugar field with the greatest sugar amount
     * @param {SugarScape} sugarScape SugarScape Object
     */
    move() {
        let count = 0;
        this.debug = [];
        let nearestSpot = createVector(0, 0);
        let prevAgents = this.agents;
        let nextAgents = this.fillGridWithAgents(0);
        console.log('start');
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                let agent = this.agents[x][y];
                console.log(agent);
                if (agent !== null) {
                    //////////////////////////
                    //search the empty spots//
                    //////////////////////////
                    let emptySpots = [];
                    for (let i = -agent.v; i <= agent.v; i++) {
                        //wrap around with modulo
                        let posX = (i + x + this.cols) % this.cols;
                        if (this.agents[posX][y] === null) emptySpots.push(createVector(posX, y));
                        let posY = (i + y + this.rows) % this.rows;
                        //we find the empty spots in the agent grid
                        if (this.agents[x][posY] === null) emptySpots.push(createVector(x, posY));
                    }

                    //////////////////////////////////////////////////////////
                    //search the sugarfields with the highest amout of sugar//
                    //////////////////////////////////////////////////////////
                    let max = -1;
                    let sugarSpots = [];//array of sugar fields with high amount of sugar
                    for (let spot of emptySpots) {
                        let sugarAmount = this.sugarFields[spot.x][spot.y].sugarAmount;
                        if (sugarAmount >= max) {
                            max = sugarAmount;
                        }
                    }
                    for (let spot of emptySpots) {
                        let sugarAmount = this.sugarFields[spot.x][spot.y].sugarAmount;
                        if (sugarAmount >= max) sugarSpots.push(spot);
                    }
                    //////////////////////////////////
                    //search the nearest sugar field//
                    //////////////////////////////////
                    let min = 9999999;
                    let nearestSpots = [];// Array of near positions
                    for (let spot of sugarSpots) {
                        let pos = createVector(x, y);
                        let d = p5.Vector.dist(pos, spot);
                        // console.log(d);
                        //get the nearest sugarfield
                        if (d <= min) {
                            min = d;
                        }
                    }
                    // console.log(min);
                    for (let spot of sugarSpots) {
                        let pos = createVector(x, y);
                        let d = p5.Vector.dist(pos, spot);
                        //push the position in a vector array
                        if (d <= min) {
                            // console.log(d);
                            nearestSpots.push(spot);
                        }
                    }
                    //if there is more than one position get a random position
                    if (nearestSpots.length > 0) {
                        let randomIndex = Math.floor(Math.random() * nearestSpots.length);
                        nearestSpot = nearestSpots[randomIndex];
                        this.debug.push(new Debug(createVector(x * this.r + (this.r / 4),
                            y * this.r + (this.r / 4)),
                            createVector(nearestSpot.x * this.r + (this.r / 4),
                                nearestSpot.y * this.r + (this.r / 4))));
                    }
                    else {
                        agent.update(0);
                        console.log('return');
                        return;
                    }
                    /////////////////////////////////////////////////////////////////////////
                    //change the position of the agent to spot with the big amount of sugar//
                    /////////////////////////////////////////////////////////////////////////
                    // let xx = Math.floor(Math.random() * this.cols);
                    // nearestSpot = createVector(xx, y);
                    //save the agent in aseparsate variable
                    nextAgents[nearestSpot.x][nearestSpot.y] = agent;
                    nextAgents[nearestSpot.x][nearestSpot.y].update();
                    this.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount = 0;
                    console.log(this.agents);
                    console.log(nearestSpot);
                    //remove this agent
                    this.agents[x].splice(y, 1, null);
                    count++;
                    console.log(count);
                }
            }
        }

        // this.agents[nearestSpot.x][nearestSpot.y] = prevAgent;
        // console.log(this.agents[nearestSpot.x][nearestSpot.y]);
        // // this.agents[nearestSpot.x][nearestSpot.y].age = agent.age;

        // this.agents[nearestSpot.x][nearestSpot.y].update(this.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount);
        // // // agent.wealth += this.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount;
        // this.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount = 0;
        this.agents = nextAgents;
        console.log('end');
    }

    replace() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                let agent = this.agents[x][y]
                if (agent !== null && (agent.wealth < 1 || agent.age > agent.MA)) {
                    this.agents[x].splice(y, 1, null);
                    this.addAgent();
                }
            }
        }
    }
    /**
     * adds an agent at a random position
    */
    addAgent() {
        let emptySpots = [];
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.agents[x][y] === null) emptySpots.push(createVector(x, y));
            }
        }
        console.log(emptySpots);
        let spot = random(emptySpots);
        this.agents[spot.x][spot.y] = new Agent();
    }
    /**
     * sets the resolution of the grid to a specific value
     * @param {int} val resolution of the grid
     */
    setResolution(val) {
        this.r = val;
    }

    sigmoid(num) {
        return 1 / (1 + Math.exp(-num));
    }
}