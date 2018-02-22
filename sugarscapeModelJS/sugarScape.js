class SugarScape {
    constructor(numAgents, resolution) {
        this.rows = 50;//we can make them change later
        this.cols = 50;
        this.sugarFields = [];
        this.r = resolution;
        this.init();
    }
    init() {
        for (let y = 0; y < this.rows; y++) {
            this.sugarFields[y] = [];
            for (let x = 0; x < this.cols; x++) { 
                this.sugarFields[x][y] = new SugarField()
            }
        }
    }

    show() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.sugarFields[x][y].show(x, y, this.r);
            }
        }
    }
    /**
     * sets the resolution of the grid to a specific value
     * @param {int} val resolution of the grid
     */
    setResolution(val) {
        this.r = val;
    }
}