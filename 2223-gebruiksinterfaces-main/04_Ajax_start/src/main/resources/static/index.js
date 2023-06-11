console.log("haha");
let omgeving = document.getElementById("cards");
fetch('posts.json', {
    method: "GET",
}).then(response => response.json()).then(response => parseAnswer(response));
function parseAnswer(data) {
    console.log(data)
    for (let el of data) {
        let div = document.createElement("div");
        div.setAttribute("class", "card mb-4");
        let div2 = document.createElement("div");
        div2.setAttribute("class", "card-header");
        div2.innerText = el.title;
        div.appendChild(div2);
        div2 = document.createElement("div");
        div2.setAttribute("class", "card-body");
        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerText = el.content;
        div2.appendChild(p);
        div.appendChild(div2);
        omgeving.appendChild(div);
    }
}