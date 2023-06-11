import {stockAlphabet, stockAlphabetWithNullValues, stockMeta, stockTesla} from "./stock.js";
import {Plot} from "./plot.js";

const {map, filter} = rxjs.operators;
const {fromEvent, merge} = rxjs;

let subscription;



window.onload = function () {

    let aandeel = document.getElementById("aandeel")
    let eenheid = document.getElementById("eenheid")
    let resolutie = document.getElementById("resolutie");
    merge(fromEvent(aandeel, "change"), fromEvent(eenheid, "change"), fromEvent(resolutie, "change")).subscribe(onChange);
    // 1
/*    let plot_alphabet = new Plot("Alphabet");
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
            value = [new Date(value[0]), value[1]];
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
        });*/

    function onChange() {
        if (subscription){
            subscription.unsubscribe();
        }
        document.getElementById("top-level-container").innerText = "";
        let plot = new Plot(`${aandeel.value} in ${eenheid.value}`);
        let obser;
        switch (aandeel.value) {
            case "meta":
                console.log("haja ")
                obser = stockMeta;
                break;
            case "alphabet":
                obser = stockAlphabet;
                break;
            case "tesla":
                obser = stockTesla;
                break;
            default:
                obser = null;
                break;
        }

        let exch_rate;
        switch (eenheid.value) {
            case "dollar":
                exch_rate = 1;
                break;
            case "euro":
                exch_rate = 0.94;
                break;
            case "pond":
                exch_rate = 0.83;
                break;
            default:
                exch_rate = 1;
                break;
        }


        subscription = obser
            .pipe(map((value) => [new Date(value[0]), value[1]]),
                map((value) => [value[0], value[1] * exch_rate]),
                )
            .subscribe((value) => {
                value = [new Date(value[0]), value[1]];
                plot.plotData(value);
            });
    }
}

