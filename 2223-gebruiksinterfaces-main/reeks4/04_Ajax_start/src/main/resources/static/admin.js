document.getElementById("submit").addEventListener('click', formSubmit);
let textInput = document.getElementById("txtContent");
let textTitle = document.getElementById("txtTitle");
let successAlert = document.getElementById("success_alert");
let failAlert = document.getElementById("fail_alert");
let tableBody = document.getElementById("tbl-body");
let saved_id = undefined;
function formSubmit(event) {
    event.preventDefault();
    console.log(textTitle.value, textInput.value)
    let body = {
        content: textInput.value,
        title: textTitle.value,
    }
    if (saved_id !== undefined) body.uuid = saved_id;
    fetch("/posts/", {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    }).then(response => {
        if (response.ok) {
            success("Added blogpost");
            clearFields();
            refreshTable();
        } else {
            fail(`Could not add blogpost, error code: ${response.status}`)
        }
    }).catch(() => fail('failed to make connection to server'));
}

let clearFields = () => {
    textTitle.value = textInput.value = "";
    saved_id = undefined;
}

let success = (msg) => {
    successAlert.innerText = msg;
    failAlert.hidden = true;
    successAlert.hidden = false;
}

let fail = (msg) => {
    failAlert.innerText = msg;
    successAlert.hidden = true;
    failAlert.hidden = false;
}

let addRow =(blogListElement) => {
    let tr = document.createElement("tr");
    tr.setAttribute("data-id", blogListElement.uuid);
    let td = document.createElement("td");
    td.innerText = blogListElement.title;
    tr.appendChild(td);
    td = document.createElement("td");
    let btn = document.createElement("button");
    btn.setAttribute("class", "btn_delete");
    btn.addEventListener('click', remove);
    btn.innerText="delete";
    td.appendChild(btn);
    tr.appendChild(td);

    td = document.createElement("td");
    btn = document.createElement("button");
    btn.setAttribute("class", "btn_edit");
    btn.addEventListener('click', edit);
    btn.innerText="edit";
    td.appendChild(btn);
    tr.appendChild(td);
    tableBody.appendChild(tr);
}
let refreshTable = () => {
    console.log("Tabel opnieuw instellen...")
    tableBody.innerText ="";
    fetch("/posts").then(response => response.json()).then(blogs => {
        for (const blog of blogs) {
            addRow(blog);
        }
    }).catch(() => fail('failed to make connection to server'));
}

let remove =(data) => {
    console.log("remove", data);
    const id = data.target.parentElement.parentElement.getAttribute("data-id")
    fetch(`/posts/${id}`, {
        method: "DELETE",
    }).then(response => {
        if (response.ok) {
            success(`deleted blogpost with id: ${id}`);
            refreshTable();
        } else {
            fail(`Could not delete blogpost with id: ${id}, error code: ${response.status}`)
        }
    }).catch(() => fail('failed to make connection to server'));
}
let edit =(data) => {
    console.log("edit", data)
    const id = data.target.parentElement.parentElement.getAttribute("data-id");
    fetch(`/posts/${id}`).then(response => {
        if (response.ok) {
            console.log("response", response);
            success(`you can now edit this post`);
        } else {
            fail(`failed to fetch blogpost with id ${id}, error code: ${response.status}`)
        }
        return response.json();
    }).then(blog => {
        console.log("blog", blog)
        textInput.value = blog.content;
        textTitle.value = blog.title;
        saved_id = blog.uuid;
    }).catch(() => fail('failed to make connection to server'));
}
