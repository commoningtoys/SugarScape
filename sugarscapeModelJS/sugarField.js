class SugarField {
    /**
     * SugarField object that keeps track of the sugar amount
     * @param {int} maxCapacity maximum amount of sugar that grows in this field 
     */
    constructor(maxCapacity) {
        this.mc = maxCapacity;
        this.sugarAmount = maxCapacity;
    }
    /**
     * increases the amount of sugar in the field
    */
    growSugar() {
        if (this.sugarAmount < this.mc) this.sugarAmount++;
    }
    /**
     * displays the sugarfields as ellipses with radius indicating the maxCapacity
     * and the alpha channel displaying the sugar amount in it
     * @param {int} x position on x axis
     * @param {int} y position on y axis
     * @param {int} r size of sugar field
     */
    show(x, y, r) {
        r *= map(this.mc, 0, maxSugarCapacity, 0.4, 1);
        stroke(255, 0, 0);
        fill(255, 255, 0, 255 * (this.sugarAmount / this.mc));
        ellipse(x, y, r);
    }
}