import {stockAlphabet, stockAlphabetWithNullValues, stockTesla, stockMeta, stockAlphabetHot} from "./stock.js";
import {Plot} from "./plot.js";

const {map, filter, bufferCount, tap} = rxjs.operators;
const {fromEvent} = rxjs;

let company_select = document.getElementById("company-select");
let company = "Alphabet";
let currency_select = document.getElementById("currency-select");
let currency = "USD";
let plot_frequency_select = document.getElementById("frequency-select");
let plot_frequency = 1;

let min_val_p = document.getElementById("min-val");
let min_val = null;

let max_val = null;
let max_val_p = document.getElementById("max-val");

let sum_val = 0;
let num_val = 0;
let avg_val_p = document.getElementById("avg-val");

let chart_container = document.getElementById("chart-container");

let subscription = null;

fromEvent(company_select, "change").subscribe((event) => {
    company = company_select.value;
    update()
});

fromEvent(currency_select, "change").subscribe((event) => {
    currency = currency_select.value;
    reset();
    update()
});

fromEvent(plot_frequency_select, "change").subscribe((event) => {
    plot_frequency = plot_frequency_select.value;
    update()
});

function reset() {
    // if you don't unsubscribe, the previous subscription could still update the page
    if(subscription !== null){
        subscription.unsubscribe();
    }

    min_val = null;
    max_val = null;
    sum_val = 0;
    num_val = 0;
    min_val_p.innerText = "Min:";
    max_val_p.innerText = "Max:";
    avg_val_p.innerText = "Avg:";

    chart_container.innerHTML = "";
}

function update() {
    // reset web page
    reset()

    // create new plot
    let plot = new Plot(company + " in " + currency);

    // select appropriate stock
    //let observable = stockAlphabetHot;
    let observable = stockAlphabet
    if (company === "Tesla") {
        observable = stockTesla;
    } else if (company === "Meta") {
        observable = stockMeta;
    }

    // convert to appropriate currency
    observable = observable.pipe(
        bufferCount(plot_frequency),
        map((value) => {
            return value[value.length - 1]
        }),
        map((value) => {
            if (currency === "USD") {
                return [value[0], value[1]];
            } else if (currency === "EUR") {
                return [value[0], value[1] * 0.94];
            } else if (currency === "GBP") {
                return [value[0], value[1] * 1.14];
            }
        }),
        map((value) => {
            return [new Date(value[0]), value[1]];
        }),
        tap((value) => {
            if (value[1] < min_val || min_val === null) {
                min_val = value[1];
            }
            if (value[1] > max_val || max_val === null) {
                max_val = value[1];
            }
            sum_val += value[1];
            num_val += 1;

            min_val_p.innerText = "Min: " + Math.floor(min_val);
            max_val_p.innerText = "Max: " + Math.floor(max_val);
            avg_val_p.innerText = "Avg: " + Math.floor(sum_val / num_val);
        })
    );

    subscription = observable.subscribe((value) => {
        plot.plotData(value);
    });
}

window.onload = function () {
    update();
}


/*
// DEEL 1
window.onload = function () {
    // 1
    let plot_alphabet = new Plot("Alphabet");
    // 2 & 3
    stockAlphabet.pipe(
        map((value) => [new Date(value[0]), value[1]]))
        .subscribe((value) => {
            plot_alphabet.plotData(value);
        });

    // 4
    let plot_alphabet_euro = new Plot("Alphabet in Euro");
    stockAlphabet
        .pipe(map((value) => [new Date(value[0]), value[1]]),
            map((value) => [value[0], value[1] * 0.94]))
        .subscribe((value) => {
            plot_alphabet_euro.plotData(value);
        });

    // 5
    let plot_alphabet_with_null_values = new Plot("Alphabet with null values");
    stockAlphabetWithNullValues
        .pipe(filter((value) => value[0] !== null),
            filter((value) => value[1] !== null),
            map((value) => [new Date(value[0]), value[1]]))
        .subscribe((value) => {
            plot_alphabet_with_null_values.plotData(value);
        });
}
*/
