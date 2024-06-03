
class DiscreteInterpolation {

    #form

    #values = {}
    #count = 3;

    constructor() {
        this.Setup();
    }

    Setup() {
        this.#form = document.querySelector("form");
        this.#form.append(this.MakeAddField());
        this.#values.v01 = this.MakeValueElm()
        this.#values.v01.id = "v01";
        this.#form.append(this.#values.v01.div);
        this.#form.append(this.MakeAddField());
        this.#values.v02 = this.MakeValueElm();
        this.#values.v02.id = "v02"
        this.#form.append(this.#values.v02.div);
        this.#form.append(this.MakeAddField());
        this.#values.v03 = this.MakeValueElm();
        this.#values.v03.id = "v03"
        this.#form.append(this.#values.v03.div);
        this.#form.append(this.MakeAddField());

    }

    MakeAddField() {
        const div = document.createElement("div");
        div.classList.add("add");
        div.addEventListener("click", e => {
            this.AddNewValueElm(e);
        })
        return div;
    }

    MakeValueElm(v) {
        const set = {};
        set.div = document.createElement("div");
        set.leftValue = document.createElement("input");
        set.leftValue.type = "number";
        set.leftValue.addEventListener("input", e => {
            this.Calculate();
        });
        set.div.append(set.leftValue);
        set.rightValue = document.createElement("input");
        set.rightValue.type = "number";
        set.rightValue.addEventListener("input", e => {
            this.Calculate();
        });
        set.div.append(set.rightValue);
        set.resultValue = document.createElement("input");
        set.resultValue.type = "text";
        set.div.append(set.resultValue);
        return set;
    } 

    AddNewValueElm(e) {
        const id = "v"+(this.#count++);
        this.#values[id] = this.MakeValueElm();
        this.#form.insertBefore(this.MakeAddField(), e.target);
        this.#form.insertBefore(this.#values[id].div, e.target);
    }

    Calculate() {
        const valuesList = [];
        for (const valueIndex in this.#values) {
            const left = this.#values[valueIndex].leftValue.value;
            const hasLeft = left != "";
            const valueLeft = hasLeft ? parseFloat(left) : 0;
            const right = this.#values[valueIndex].rightValue.value;
            const hasRight = right != "";
            const valueRight = hasRight ? parseFloat(right) : 0;
            valuesList.push({
                "left": valueLeft,
                "right": valueRight,
                "right-input": this.#values[valueIndex].rightValue,
                "result-output": this.#values[valueIndex].resultValue
            })
        }

        valuesList.sort((a, b) => { 
            return a.left - b.left;
        })

        const filteredValues  = valuesList.filter( e => e.left != 0 ); 


        console.log(filteredValues);

        valuesList.forEach(e => {
            if (e["left"] == 0) {
                e["right-input"].value = 0;
                e["result-output"].value = "";
            }
        });

        
        if (filteredValues.length > 2) {
            let lastValueIndex = -1;
            for (let i = 0; i < filteredValues.length; i++) {
                if (filteredValues[i].right == 0) {
                    continue;
                }
                if (lastValueIndex + 1 < i) {
                    let maxRight = filteredValues[i].right;
                    let minRight = 0;
                    if (lastValueIndex == -1) {
                        minRight = maxRight;
                    }
                    else {
                        minRight = filteredValues[lastValueIndex].right;
                    }
                    const diffRight = maxRight - minRight;

                    let minLeft = 0;
                    const maxLeft = filteredValues[i].left;
                    let ratio = 0;

                    if (diffRight != 0) {
                        minLeft =filteredValues[lastValueIndex].left;
                        const diffLeft = maxLeft - minLeft;
                        console.log("diff: " + diffRight);
                        ratio = diffRight / diffLeft;
                    }

                    for (let j = lastValueIndex + 1; j < i; j++) {
                        const diff = maxLeft - filteredValues[j].left;
                        const value = maxRight - diff * ratio;
                        filteredValues[j]["result-output"].value = value;
                    }
                }
                filteredValues[i]["result-output"].value = "";
                lastValueIndex = i;
            }
        }
    }
}

export { DiscreteInterpolation };