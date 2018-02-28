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
        /////SUGAR FIELDS///////
        this.sugarFields = [];
        this.r = resolution;
        this.fieldCenters = this.setFieldCenters(numCenters);
        this.fieldRadius = Math.sqrt(COLS * ROWS) / 5;//the radius of the field is proportional to the amount of cells
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
        for (let x = 0; x < COLS; x++) {
            this.sugarFields[x] = [];
            for (let y = 0; y < ROWS; y++) {
                let sum = 0;
                for (let fc of this.fieldCenters) {
                    let pos = createVector(x, y);
                    let d = p5.Vector.dist(pos, fc);
                    sum += this.fieldRadius / Math.pow(d, 0.9);
                }
                sum = this.sigmoid(sum);
                let max = Math.floor(constrain(map(sum, 0.7, 1, 0, maxSugarCapacity), 0, maxSugarCapacity));
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
            let x = Math.floor(Math.random() * COLS);
            let y = Math.floor(Math.random() * ROWS);
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
        for (let x = 0; x < COLS; x++) {
            result[x] = [];
            for (let y = 0; y < ROWS; y++) {
                result[x][y] = null;
            }
        }
        let count = 0;
        //fill the array with agents in random positions\
        //Needs error handling 
        while (count < num) {
            let x = Math.floor(Math.random() * COLS);
            let y = Math.floor(Math.random() * ROWS);
            if (result[x][y] === null) {
                result[x][y] = new Agent();
                count++;
            }
        }
        return result;
    }
    /** 
     * show the sugarscape
    */
    show() {
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                noFill();
                stroke(255);
                rect(x * this.r, y * this.r, this.r, this.r)
                this.sugarFields[x][y].show(x, y, this.r);
            }
        }
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                if (this.agents[x][y] !== null) this.agents[x][y].show(x, y, this.r)
            }
        }
    }
    displayDebug() {
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
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                this.sugarFields[x][y].growSugar();
            }
        }
    }
    /**
     * Move the agent to the nearest sugar field with the greatest sugar amount
     */
    move() {
        this.debug = [];
        let nearestSpot = createVector(0, 0);
        let nextAgents = this.fillGridWithAgents(0);
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                let agent = this.agents[x][y];
                if (agent !== null) {
                    //////////////////////////
                    //search the empty spots//
                    //////////////////////////
                    let emptySpots = [];
                    for (let i = -agent.v; i <= agent.v; i++) {
                        //wrap around with modulo
                        let posX = (i + x + COLS) % COLS;
                        if (this.agents[posX][y] === null) emptySpots.push(createVector(posX, y));
                        let posY = (i + y + ROWS) % ROWS;
                        //we find the empty spots in the agent grid
                        if (this.agents[x][posY] === null) emptySpots.push(createVector(x, posY));
                    }

                    //////////////////////////////////////////////////////////
                    //search the sugarfields with the highest amout of sugar//
                    //////////////////////////////////////////////////////////
                    let max = 0;
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
                        //get the nearest sugarfield
                        if (d <= min) {
                            min = d;
                        }
                    }
                    for (let spot of sugarSpots) {
                        let pos = createVector(x, y);
                        let d = p5.Vector.dist(pos, spot);
                        //push the position in a vector array
                        if (d <= min) {
                            nearestSpots.push(spot);
                        }
                    }
                    //if there is more than one position get a random position
                    if (nearestSpots.length > 0) {
                        let randomIndex = Math.floor(Math.random() * nearestSpots.length);
                        nearestSpot = nearestSpots[randomIndex];
                        this.debug.push(new Debug(createVector(x * this.r, y * this.r),
                            createVector(nearestSpot.x * this.r, nearestSpot.y * this.r)));
                    }
                    else {
                        agent.update(0);
                        return;
                    }
                    /////////////////////////////////////////////////////////////////////////
                    //change the position of the agent to spot with the big amount of sugar//
                    /////////////////////////////////////////////////////////////////////////
                    //save the agent in aseparsate variable
                    nextAgents[nearestSpot.x][nearestSpot.y] = agent;
                    nextAgents[nearestSpot.x][nearestSpot.y].update();
                    this.sugarFields[nearestSpot.x][nearestSpot.y].sugarAmount = 0;
                    //remove this agent
                    this.agents[x].splice(y, 1, null);
                }
            }
        }
        this.agents = nextAgents;
    }

    replace() {
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
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
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                if (this.agents[x][y] === null) emptySpots.push(createVector(x, y));
            }
        }
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