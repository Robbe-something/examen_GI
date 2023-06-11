let som = 0;

function leesGetal() {
    console.log("start leesGetal");
    let belofte = new Promise((resolve, reject) => {
        console.log("leesGetal");
        let antw = prompt("geef getal");
        if (!isNaN(antw)) {
            console.log("naar resolve met " + parseInt(antw));
            resolve(parseInt(antw)); // hier geef je 1 parameter mee, omdat je verwacht dat de volgende promise 1 parameter nodig heeft
        } else {
            console.log("naar reject met " + antw);
            reject("Dit is geen getal: " + antw);
        }
    });
    return belofte;
}

function telBij(getal) {
    console.log("start telBij voor getal " + getal);
    let belofte = new Promise((resolve, reject) => {
        console.log("in promise met som,getal" + som + "," + getal);
        if (som + getal <= 100) {
            som += getal;
            resolve();  // hier geef je geen parameters mee, omdat je verwacht dat de volgende promise geen parameters nodig heeft
        } else {
            reject("Ik stop; de som werd groter dan 100 (nl " + (som + getal) + ").");
        }
    });
    return belofte;
}

function toonAntwoord() {
    alert("som is " + som);
}

function zegStop(foutmelding) {
    alert(foutmelding);
}

alert("start");
leesGetal().then(telBij).then(leesGetal).then(telBij).then(leesGetal).then(telBij).then(toonAntwoord).catch(zegStop);
// catch wordt alleen uitgevoerd als het ergens mis loopt !!

