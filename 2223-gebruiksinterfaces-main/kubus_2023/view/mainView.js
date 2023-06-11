import RubiksCube from "../scripts/model/rubiksCube.js";
import Cube from "../scripts/model/cube.js";
import Point2D from "../scripts/model/point2D.js";
import Direction from "../scripts/model/direction.js";

let cube = new RubiksCube();
let draaiButtons = document.getElementsByName("draaien");
for (let button of draaiButtons) {
    button.addEventListener('click', (el) => {
        console.log(el.target.dataset.value)
        cube.rotate(Direction[el.target.dataset.value], true);
    })
}
console.log(cube)
const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const scale = 30;
const offset = scale/2;

for (let face of cube.getAllFaces3D()) {
    drawShape(ctx, face.color, face.corners)
}


/**
 *
 * @param {CanvasRenderingContext2D}ctx
 * @param {string}color
 * @param {Point3D[]}points
 */
function drawShape(ctx, color, points) {
    let points2D = points.map(x => new Point2D(x));
    ctx.beginPath();
    ctx.moveTo((points2D[0].x+offset)*scale, (points2D[0].y+offset)*scale);
    for (let point of points2D ){
        ctx.lineTo((point.x+offset)*scale, (point.y+offset)*scale);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.lineWidth = 1;
    ctx.fill();
    ctx.stroke();
}

