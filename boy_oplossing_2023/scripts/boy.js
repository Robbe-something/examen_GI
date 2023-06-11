// alert("script gevonden")

// VRAAG 5.1

let knop = document.getElementById("id_knop");
knop.onclick = toonPrent;

/* nodig voor 5.1, aangepast voor 5.3
function toonPrent(){
    let prent = document.getElementById("prent");
    prent.src = "images/en_brave.jpg"
    prent.alt = "en_brave.jpg"
}
*/


// VRAAG 5.2

let radio_en = document.getElementById("en");
let radio_fr = document.getElementById("fr");

radio_en.onclick = vulKeuzelijst;
radio_fr.onclick = vulKeuzelijst;

// Onderstaande code werkt ook voor meerdere talen ALS er ergens een lijstje is met alle
// talen en bijhorende betandsnamen van de afbeeldingen
// (dan moet het tweede stuk met de 'if'
// uiteraard nog vervangen worden).
function vulKeuzelijst(){
    let taal = ""
    let radiobuttons = document.getElementsByName("taal");
    for (let radio of radiobuttons){
        if (radio.checked){
           taal = radio.id; // en of fr
        }
    }
    /* oudere versie, als je enkel 'en' en 'fr' wil doen
    if(taal === "en"){
        vulKeuzelijstMet("brave","home","strength","who");
    }
    else if(taal === "fr"){
        vulKeuzelijstMet("grand","mieux","petit");
    }
    */
    /*
    ALTERNATIEF, zodat niet alle radiobuttons afgelopen moeten worden:
    maak een globale variabele aan waarin je de huidige taal bewaart;
    telkens een radio-button aangeklikt wordt, wordt deze variabele aangepast.
     */
    let items = [];
    for(let bestandsnaam of bestandsnamen){
        if(bestandsnaam.startsWith(`${taal}_`)){
            let keuzelijstItem = bestandsnaam.substring(bestandsnaam.indexOf("_")+1);
            items.push(keuzelijstItem);
        }
    }
    vulKeuzelijstMetList(items);
}

function vulKeuzelijstMet(... items){
    let select = document.getElementById("id_select");
    while(select.firstChild){ // haal eerst alle kinderen weg
        select.firstChild.remove();
    }
    for (let item of items){
        let option = document.createElement("option");
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }
}
function vulKeuzelijstMetList(items){
    let select = document.getElementById("id_select");
    while(select.firstChild){ // haal eerst alle kinderen weg
        select.firstChild.remove();
    }
    for (let item of items){
        let option = document.createElement("option");
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }
}

// VRAAG 5.3

function toonPrent(){
    let select = document.getElementById("id_select");
    let naamAfbeelding = select.value;

    let radiobuttons = document.getElementsByName("taal");
    for (let radio of radiobuttons){
        if (radio.checked){
            taal = radio.id; // en, fr, nl, ...
        }
    }

    naamAfbeelding = `images/${taal}_${naamAfbeelding}.jpg`;

    let prent = document.getElementById("prent");
    prent.src = naamAfbeelding
    prent.alt = naamAfbeelding
}

// VRAAG 5.4

let bestandsnamen = ["de_entdeckung","de_zeitverschwendung","en_brave","en_home","en_strength","en_who","fr_grand","fr_mieux","fr_petit","nl_glas","nl_klein","nl_leven"]
let mappingTalen = {nl:"Nederlands",fr:"Français",en:"English",de:"Deutsch"};

function maakRadioButtons(){
    let talen = [];
    for(let bestandsnaam of bestandsnamen){
        let taal = bestandsnaam.substring(0,bestandsnaam.indexOf("_"));
        if(talen.indexOf(taal) == -1){
            talen.push(taal);
        }
    }
    maakRadioButtonsVoorTalen(talen);
}

function maakRadioButtonsVoorTalen(talen){
    let eltRadiobuttons = document.getElementById("id_radiobuttons");
    while(eltRadiobuttons.firstChild){
        eltRadiobuttons.firstChild.remove();
    }
    for(let taal of talen){
        let eltDiv = document.createElement("div");
        //eltDiv.class = "form-group"; // moet anders, omdat er verschillende klassen kunnen zijn !!
        eltDiv.classList.add("form-group");

        let eltInput = document.createElement("input");
        //eltInput.class = "form-check-input"; // moet anders, analoog aan hierboven
        eltInput.classList.add("form-check-input");
        eltInput.type = "radio";
        eltInput.id = taal;
        eltInput.name = "taal";
        eltInput.value = mappingTalen[taal];
        eltInput.onclick = vulKeuzelijst;    //+/ als je dat niet doet, gebeurt er niets...

        let eltLabel = document.createElement("label");
        //eltLabel.class="form-check-label"; // moet anders!
        eltLabel.classList.add("form-check-label");
        eltLabel.htmlFor=taal; // ! .for werkt niet, omdat dat een gereserveerd keyword is
        eltLabel.textContent = mappingTalen[taal];

        eltDiv.appendChild(eltInput);
        eltDiv.appendChild(eltLabel);
        eltRadiobuttons.appendChild(eltDiv);
    }
}


maakRadioButtons();
