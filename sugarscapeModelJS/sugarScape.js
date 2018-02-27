class SugarScape {
    constructor(numAgents, resolution, numCenters) {
        this.rows = rows;//we can make them change later
        this.cols = cols;
        /////SUGAR FIELDS///////
        this.sugarFields = [];
        this.r = resolution;
        this.fieldCenters = this.setFieldCenters(numCenters);
        this.fieldRadius = 4;
        ///////AGENTS////////////
        this.agents = [];
        this.agents = this.fillGridWithAgents(numAgents);
        this.initSugarFields();
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
                let sf = new SugarField(x, y, max);
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
                result[x][y] = new Agent(x, y);
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
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.sugarFields[x][y].show(this.r);
            }
        }
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.agents[x][y] != null) this.agents[x][y].show(this.r)
            }
        }
    }
    update() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.sugarFields[x][y].growSugar();
                let agent = this.agents[x][y];
                if (agent != null) agent.move(this);
                if (agent != null && (agent.wealth < 1 || agent.age > agent.MA)) {
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
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.agents[x][y] === null) emptySpots.push(createVector(x, y));
            }
        }
        // console.log(emptySpots);
        let spot = random(emptySpots);
        this.agents[spot.x][spot.y] = new Agent(spot.x, spot.y);
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