// Dit deel zorgt voor een 'reset', 'bewaar' en 'toon Locale Storage' knop,
// - waarna die laatste twee knoppen eigenlijk weer weg mogen;
//   dat zijn immers tussenstappen om tot de eindoplossing te komen:
//   de Locale Storage wordt gebruikt om bij heropenen van de pagina de kubus in
//   zijn laatste 'dooreengeschudde toestand' te tonen.

import RubiksCube from '../model/rubiksCube.js'
import Point2D from '../model/point2D.js'
import Direction from '../model/direction.js'

let canvas = document.getElementsByTagName("canvas")[0]
let context = canvas.getContext("2d")

let cube = new RubiksCube()
let W = canvas.width / 2
let H = canvas.height / 2
let F = canvas.width / 16 // F van factor om zijde van kubusje te schalen

let td_metdeklokmee = document.getElementById("met_de_klok_mee")
let td_tegendeklokin = document.getElementById("tegen_de_klok_in")
voegKnoppenToe(td_metdeklokmee, "met de klok mee")
voegKnoppenToe(td_tegendeklokin, "tegen de klok in")

// nieuw in deel 3, voor gradueel verdraaien van een schijf van 9 blokjes:
let degrees = 0     // huidige graden waarover een schijf van 9 blokjes gedraaid is
let interval = null // interval dat start met tikken als er op een gekleurde knop geklikt wordt
let currentDirection = null // de huidige richting waarin gedraaid wordt (zodra er op een gekleurde knop geklikt wordt,
                            // wordt deze currentDirection aangepast)
let currentClockwise = null // geeft aan of de huidige draairichting clockwise is (wordt ook ingesteld zodra er op een
                            // gekleurde knop geklikt wordt)

let intervalTime = 30

// nieuw voor deel 4

// LET OP
// Bij het opslaan van informatie in de Local Storage kan je wel array's bewaren,
// maar geen objecten (tenzij je extra acties onderneemt om die stringifiable te maken)
// - dat is ook overbodig: gebruik de geheugenruimte van de Local Storage zo zuinig mogelijk.
// Het is dus voldoende van de kleur (of de naam) van het Direction-object op te slaan,
// en de draaizin (wijzerzin/tegenwijzerzin). Al de rest kan je vandaaruit weer opbouwen.
// De array 'actionsTakenThusFar' bewaart dus enkel gegevens die bestaan uit color (string) en clock (boolean).
let actionsTakenThusFar = []
window.addEventListener("beforeunload", save) // functie save bewaart actionsTakenThusFar in Local Storage


let tableEltLocalStorage = document.getElementById("id_local_storage")
let knopBewaar = document.getElementById("id_bewaar")
let knopReset = document.getElementById("id_reset")
let knopToonLocalStorage = document.getElementById("id_toon")
knopBewaar.addEventListener("click", save)
knopReset.addEventListener("click", reset)
knopToonLocalStorage.addEventListener("click", showLocalStorage)


function reset() {
    cube = new RubiksCube()
    currentDirection = null
    currentClockwise = null
    interval = null
    degrees = 0
    actionsTakenThusFar = []
    save()  // save ook meteen in local storage, anders staan daar nog oude gegevens in
    draw(cube.getAllFaces3D()) // en teken de nieuwe kubus...
}

// Al wat tot nu toe werd opgeslagen in de array 'actionsTakenThusFar' wordt naar local storage geschreven.
// Twee opties:
// (a) dit na elke wijziging aan 'actionsTakenThusFar' bewaren (zekerst, maar niet zo efficiënt)
// (b) pas opslaan als de pagina verlaten wordt.
// Lees ook
// https://stackoverflow.com/questions/44435655/how-to-save-data-in-local-storage-before-leaving-a-page-on-ios-devices
// waarin er voor gewaarschuwd wordt dat optie (b) niet per se op alle devices werkt.
// Dus extra testcases nodig!!
// In deze oplossing werken we versie (b) uit. Het kan en mag zeker anders, als versie (a).
function save() {
    localStorage.setItem("actions", JSON.stringify(actionsTakenThusFar)) // op localstorage kan je alleen strings zetten, geen objecten (in objecten)
}

function showLocalStorage() {
    while (tableEltLocalStorage.firstChild) {
        tableEltLocalStorage.firstChild.remove()
    }

    let actionsString = localStorage.getItem("actions")
    if (actionsString != null) {
        let actions = JSON.parse(actionsString) // maak weer objecten van string
        if (actions.length == 0) {
            console.log("Local Storage is leeg")
        } else {
            let str = ""
            let i = 1
            for (let action of actions) {
                let kleur = action.color
                let draaizin = action.clock ? "met klok mee" : "tegen klok in"
                addToTableLocalStorage(i, kleur, draaizin)
                i += 1
            }
        }
    }
}

function addToTableLocalStorage(i, kleur, draaizin) {
    let tr = document.createElement("tr")
    addTableData(tr, i)
    addTableData(tr, kleur)
    addTableData(tr, draaizin)
    tableEltLocalStorage.appendChild(tr)
}

function addTableData(tr, info) {
    let td = document.createElement("td")
    td.textContent = "" + info
    tr.appendChild(td)
}

// Functie die door alle gekleurde knoppen wordt uitgevoerd bij klikken op knop
// (bovenop de reeds bestaande reactie 'rotateAndDraw').
// Het koppelen van de event met deze functie gebeurt bij het instantiëren van de knoppen
// (zie functie voegKnoppenToe)
function saveForLocalStorage(event) {
    let kleur = event.target.getAttribute("kleur")
    let direction = Direction.getDirection(kleur)
    let clockwise = event.target.textContent.includes("mee")
    actionsTakenThusFar.push({color: direction.color, clock: clockwise})
    // Je zou ervoor kunnen kiezen om nu meteen de functie save() op te roepen,
    // in plaats van enkel voor unload van het webpaginavenster (window.addEventListener("beforeUnload",save)).
}

// Let op, bewaar ook alle rotaties die je laat zien in 'actionsTakenThusFar',
// want bij heropenen van de website is die array leeg.
// En bij verdere rotaties wordt die array wel verder aangevuld,
// maar de rotaties die in de Local Storage bewaard werden,
// die zouden dan niet in de array 'actionsTakenThusFar' zitten.
function showCubeByStartOfPage() {
    let actionsString = localStorage.getItem("actions")
    if (actionsString != undefined) {
        let actions = JSON.parse(actionsString)
        for (let action of actions) {
            actionsTakenThusFar.push({color: action.color, clock: action.clock})
            let direction = Direction.getDirection(action.color)
            cube.rotate(direction, action.clock)
        }
    }
    draw(cube.getAllFaces3D())
}

showCubeByStartOfPage()

/// hieronder staan de oude functies (delen 1 tot en met 3)

function voegKnoppenToe(td, boodschap) {
    let table = document.createElement("table")
    td.appendChild(table)
    let directions = [Direction.XPOS, Direction.YPOS, Direction.ZPOS, Direction.XNEG, Direction.YNEG, Direction.ZNEG]

    for (let dir of directions) {
        let tr = document.createElement("tr")
        table.appendChild(tr)

        let td_ = document.createElement("td")
        tr.appendChild(td_)

        let button = document.createElement("button")
        td_.appendChild(button)

        button.style.backgroundColor = dir.color
        button.textContent = boodschap
        button.addEventListener("click", rotateAndDraw)
        button.addEventListener("click", saveForLocalStorage) // nieuw voor deel 4
        button.setAttribute("kleur", dir.color) // nieuw attribuut; op te vragen via getAttribute("kleur")
    }
}

function rotateAndDraw(event) {
    let geklikte_knop = event.target
    currentDirection = Direction.getDirection(geklikte_knop.getAttribute("kleur"))
    currentClockwise = (geklikte_knop.textContent.includes("mee"))

    disableButtons(true) // zorg dat de knoppen niet aangeklikt kunnen worden

    // deze code is nieuw t.o.v. deel 2;
    // hier wordt per 2 graden de schijf van 9 blokjes gedraaid.
    degrees = 0
    interval = setInterval(rotateSmallAmountAndDraw, intervalTime)
}

function rotateSmallAmountAndDraw() {
    if (currentClockwise) {
        degrees -= 2  // zorg dat dit een gehele deler is van 90!
    } else {
        degrees += 2
    }

    let faces = cube.getAllFaces3DDuringRotation(currentDirection, degrees)
    draw(faces)

    if (Math.abs(degrees) >= 90) {
        clearInterval(interval)
        degrees = 0

        // op het einde wordt de kubus ook effectief geroteerd
        // (zodat alle middelpunten van blokjes op de juiste plaats staan)
        cube.rotate(currentDirection, currentClockwise)

        disableButtons(false) // maak de knoppen weer klikbaar
    }
}

function draw(faces) {
    clearCanvas()
    for (let face of faces) {
        context.beginPath() // niet vergeten!!
        context.fillStyle = face.color
        let pt2d = new Point2D(face.corners[face.corners.length - 1])
        context.moveTo(W + F * pt2d.x, H + F * pt2d.y)
        for (let corner of face.corners) {
            pt2d = new Point2D(corner)
            context.lineTo(W + F * pt2d.x, H + F * pt2d.y)
        }
        context.stroke()
        context.fill()
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function disableButtons(disabled) {
    let buttons = document.getElementsByTagName("button")
    for (let button of buttons) {
        button.disabled = disabled
    }
}


