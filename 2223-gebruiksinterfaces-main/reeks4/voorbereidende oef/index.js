let som = 0;

leesGetalPar = (veelvoud) => () => new Promise((resolve, reject) => {
        let getal = prompt("Geef getal (veelvoud van " + veelvoud + ")");
        let getal_int = parseInt(getal);
        if (Number.isNaN(getal_int)) {
            alert(`Dit is geen getal ${getal}`);
            reject("not a number");
        }
        if (getal_int % veelvoud !== 0) {
            alert(`Dit is geen veelvoud van ${veelvoud}: ${getal}`);
            reject("not a multiple");
        }
        resolve(getal_int);
    })




telBij = (getal) => new Promise((resolve, reject) => {
    som += getal;
    if (som > 100) {
        alert(`Ik stop; de som werd groter dan 100 (nl ${som}).`);
        reject("De som is te groot");
    }
    resolve(som)

})

geefSom = (getal) => {
    alert(`De som is ${getal}`);
}

leesGetalPar(2)()
    .then(telBij)
    .then(leesGetalPar(3))
    .then(telBij)
    .then(leesGetalPar(4))
    .then(telBij)
    .then(geefSom)
    .catch(console.log);