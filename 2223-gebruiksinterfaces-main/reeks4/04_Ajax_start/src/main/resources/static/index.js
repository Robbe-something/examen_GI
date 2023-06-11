let blogs = document.getElementById("blogs");

fetch('/posts').then(res => res.json()).then(bloglist => populate(bloglist));

populate = (bloglist) => {
    for (const bloglistElement of bloglist) {
        let card = document.createElement("div");
        card.setAttribute("class", "card mb-4");
        let card_header = document.createElement("div");
        card_header.setAttribute("class", "card-header");
        card_header.innerText = bloglistElement.title;
        card.appendChild(card_header);
        let card_body = document.createElement("div");
        card_body.setAttribute("class", "card-body");
        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerText = bloglistElement.content;
        card_body.appendChild(p);
        let link = document.createElement("a");
        link.setAttribute("href", "#");
        link.setAttribute("class", "btn btn-primary");
        link.innerText = "Read more";
        card_body.appendChild(link);
        card.appendChild(card_body);
        blogs.appendChild(card);
    }
}
