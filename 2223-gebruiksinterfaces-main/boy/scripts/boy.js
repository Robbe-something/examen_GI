let mappingTalen = {nl: "Nederlands", fr: "Français", en: "English", de: "Deutsch"};
let bestandsnamen = ["de_entdeckung", "de_zeitverschwendung", "en_brave", "en_home", "en_strengt", "en_who", "fr_grand", "fr_mieux", "fr_petit", "nl_glas", "nl_klein", "nl_leven"];

let knop = document.getElementById("prentknop")
knop.addEventListener("click", toonPrent)

let form = document.querySelector("form");
for (let key in mappingTalen) {
    let group = document.createElement("div")
    group.setAttribute("class", "form-group")
    let input = document.createElement("input")
    input.setAttribute("class", "form-check-input");
    input.setAttribute("type", "radio")
    input.setAttribute("id", key);
    input.setAttribute("name", "taal")
    input.setAttribute("value", key)
    input.addEventListener("click", vulKeuzeLijstMet)
    group.appendChild(input);
    let label = document.createElement("label")
    label.setAttribute("class", "form-check-label")
    label.setAttribute("for", key)
    label.textContent = mappingTalen[key];
    group.appendChild(label)
    form.appendChild(group)
}

function toonPrent() {
    let bn = document.forms.language.elements.taal.value + "_" + document.getElementsByName("prenten")[0].value;
    let prent = document.getElementById("prent");
    prent.setAttribute("src", "/images/" + bn + ".jpg")

}

function vulKeuzeLijstMet(el) {
    let taal = el.target.attributes.value.value
    //taal = document.forms.language.elements.taal.value;
    console.log("lijst opvullen");
    let omvang = document.getElementsByName("prenten")[0];
    omvang.textContent = "";
    let waardes = [];
    bestandsnamen.forEach((bn) => {
        if (bn.substring(0, 2) === taal) {
            waardes.push(bn.substring((3)))
        }
    })
    waardes.forEach((waarde) => {
        let option = document.createElement("option")
        option.setAttribute("value", waarde);
        option.textContent = waarde;
        omvang.appendChild(option);
    });
}