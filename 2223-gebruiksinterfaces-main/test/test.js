class Calculator {
    sum(a,b) {
        return a+b;
    }
}

class Receipt {
    constructor(calculator) {
        this.calc = calculator;
    }

    print(itemA, itemB) {
        console.log(this.calc.sum(itemA, itemB))
    }
}

let r = new Receipt(new Calculator())
r.print(1,2)