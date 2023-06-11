// promises kunnen slechts 1 parameter tegelijk aan; gebruik compose en spread
// zoekterm: can a promise have more than one parameter

let noemer = 2;

//let huidigGetal = 0;

function leesGetal(gegevens) {
    [som, noemer] = gegevens;
    console.log("start leesGetal");
    let belofte = new Promise((resolve, reject) => {
        console.log("leesGetal");
        let antw = prompt("geef getal (veelvoud van " + noemer + ")");
        if (!isNaN(antw)) {
            console.log("naar resolve met som,getal,noemer " + som + "," + parseInt(antw) + "," + noemer);
            resolve([som, parseInt(antw), noemer]); // hier geef je 3 parameters mee, omdat je verwacht dat de volgende promise 3 parameters nodig heeft
        } else {
            console.log("naar reject met " + antw);
            reject("Dit is geen getal: " + antw);
        }
    });
    return belofte;
}

function telBij(gegevens) {
    [som, getal, noemer] = gegevens;
    console.log("start telBij voor som,getal,noemer " + som + "," + getal + "," + noemer);
    let belofte = new Promise((resolve, reject) => {
        console.log("in promise met som,getal,noemer: " + som + "," + getal + "," + noemer);
        if (getal % noemer == 0) {
            som += Math.floor(getal / noemer);
            resolve([som, noemer + 1]);  // hier geef je 2 parameters mee, omdat je verwacht dat de volgende promise 2 parameters nodig heeft
        } else {
            reject("Dit is geen veelvoud van " + noemer + ": " + getal);
        }
    });
    return belofte;
}

function toonAntwoord() {
    alert("som is " + som);
}

function zegStop(reason) {
    alert("Programma vroegtijdig gestop. " + reason);
}

/*
function loop(tekst) {
    for (let i = 0; i < 10; i++) {

        for (let j = 0; j < 100; j++) {
            console.log(tekst + " " + i + " " + j);
        }
    }
}
*/


alert("start");
leesGetal([0, noemer]).then(telBij).then(leesGetal).then(telBij).then(leesGetal).then(telBij).then(toonAntwoord).catch(zegStop);

/*
for (let i = 0; i < 10; i++) {

    for (let j = 0; j < 100; j++) {
        console.log(i + " " + j);
    }
}

loop("A");
loop("B");
loop("C");
loop("D");
loop("E");
*/
// catch wordt alleen uitgevoerd als het ergens mis loopt !!
