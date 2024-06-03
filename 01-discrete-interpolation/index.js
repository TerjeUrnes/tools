import { DiscreteInterpolation } from "./discrete-interpolation.js";

var index;

document.addEventListener('readystatechange', function() {
    if (document.readyState === "complete") { 
        index = new Index();
   } 
});

class Index {

    #discreteInterpolation

    constructor() {
        this.#discreteInterpolation = new DiscreteInterpolation();
    }
}
