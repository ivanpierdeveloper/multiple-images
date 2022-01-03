'use strict'
const cls = new Classmyalertjs();
const fnc = Funcmyalertjs;
// testing
// cls.messaggio("Call method messaggio");
// fnc.showMyAlert("titolo", "messaggio.", "var(--info)", "var(--white)", "var(--warning)", "var(--dark)");
function multipleImage() {
    let images = Array();
    let path_folder_image = document.querySelector('.path-folder-image').value;
    let url = document.querySelector('.path-url').value;
    let btn_multiple_image = document.querySelector('.btn-multiple-image');
    let multiple_image = document.querySelector('.multiple-image');
    if (path_folder_image == "" && url == "") {
        fnc.showMyAlert("avviso", "non hai compilato percorso immagine e/o url", 'var(--danger)', 'var(--warning)', 'var(--white)', 'var(--dark)');
        return false;
    } else {
        if (multiple_image.files.length == 0) {
            fnc.showMyAlert("avviso", "non hai selezionato immagini", 'var(--warning)', 'var(--danger)', 'var(--dark)', 'var(--dark)');
            return false;
        }

        console.table({
            "file size": multiple_image.files[0].size,
            "file type": multiple_image.files[0].type
        })
        if (multiple_image.files[0].type != "image/png") {
            console.error("Non è compatibile");
            fnc.showMyAlert("avviso", "formato non compatibile, solo png", 'var(--danger)', 'var(--warning)', 'var(--white)', 'var(--dark)');
            return;
        } else {
            if (multiple_image.files[0].size > 120000) {
                console.error("Dimensioni superiori a 120KB");
                fnc.showMyAlert("avviso", "dimensioni superiori a 120kb", 'var(--danger)', 'var(--warning)', 'var(--white)', 'var(--dark)');
                return;
            }
        }
    }
    /* var path_file = file.files[0];
    images.push(path_file); */
    console.table({ "Numero di immagini": multiple_image.files.length });
    var num_image = multiple_image.files.length;
    for (var i = 0; i < num_image; i++) {
        images.push(multiple_image.files[i]);
    }
    console.table({ "images": images });
    fetchMultipleImage(images, path_folder_image, url);
}

async function fetchMultipleImage(images, path_folder_image, url) {
    const frmData = new FormData();
    for (var x = 0; x < images.length; x++) {
        frmData.append(`images${x}`, images[x]);
    }
    frmData.append("numImage", images.length);
    const hd = new Headers({
        "Content-Type": "application/json"
    });
    const rq = new Request(url, {
        method: "POST",
        mode: "cors",
        body: frmData
    });
    await fetch(rq)
        .then((rs) => {
            if (rs.ok) {
                return Promise.resolve(rs.json());
            } else {
                return Promise.reject({
                    status: rs.status,
                    statusText: rs.statusText
                });
            }
        })
        .then((data) => {
            console.table(data);
            createDiv(data, path_folder_image);
        })
        .catch((error) => {
            console.table({
                "messaggio": error.statusText,
                "codice": error.status
            })
            fnc.showMyAlert("avviso", `codice error: ${error.status} message error: ${error.statusText}`, 'var(--danger)', 'var(--warning)', 'var(--white)', 'var(--dark)');
            return false;
        })

}
// creo il div per mostrare il response
const div_response = document.createElement('div');
const div_container = document.querySelector('.container');

function createDiv(data, path_folder_image) {
    const div_style = div_response.style;
    div_style.setProperty('border', '1px solid var(--yellow)');
    div_style.setProperty('border-radius', '8px');
    div_style.setProperty('margin-top', '5px');
    div_style.setProperty('color', 'var(--success)');
    div_style.setProperty('padding', '18px');
    div_style.setProperty('font-size', '9pt');
    div_style.setProperty('display', 'block');
    const table = document.createElement('table');
    // table.style.setProperty('border', '1px solid var(--orange)');
    const caption = document.createElement('caption');
    caption.style.setProperty('border', '1px solid var(--white)');
    caption.style.setProperty('border-radius', '4px');
    caption.style.setProperty('font-weight', 'bold');
    const title = document.createTextNode(`numero di immagini ${data.length}`);
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const th4 = document.createElement('th');
    const th5 = document.createElement('th');
    const th6 = document.createElement('th');
    const th7 = document.createElement('th');
    const tbody = document.createElement('tbody');
    const id = document.createTextNode('id');
    const email = document.createTextNode('email');
    const usr = document.createTextNode('user');
    const psw = document.createTextNode('psw');
    const age = document.createTextNode('age');
    const mt = document.createTextNode('method');
    const avatar = document.createTextNode('avatar');
    tr.appendChild(th);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    tr.appendChild(th7);

    th.appendChild(id);
    th2.appendChild(email);
    th3.appendChild(usr);
    th4.appendChild(psw);
    th5.appendChild(age);
    th6.appendChild(mt);
    th7.appendChild(avatar);
    thead.appendChild(tr);
    caption.appendChild(title);
    data.forEach(function(val) {
        const trBody = document.createElement('tr');
        const td_1 = document.createElement('td');
        const td_2 = document.createElement('td');
        const td_3 = document.createElement('td');
        const td_4 = document.createElement('td');
        const td_5 = document.createElement('td');
        const td_6 = document.createElement('td');
        const td_7 = document.createElement('td');
        const avatar_img = document.createElement('img');
        avatar_img.src = `${path_folder_image}${val.avatar}`;
        avatar_img.setAttribute('alt', 'not image');
        avatar_img.style.setProperty('cursor', 'pointer');
        avatar_img.setAttribute('title', 'visualizza');
        avatar_img.style.setProperty('height', '40px');
        avatar_img.style.setProperty('width', '40px');
        avatar_img.setAttribute('id', val.avatar);
        avatar_img.classList.add('avatar');
        avatar_img.addEventListener('click', (e) => {
            window.open(`${path_folder_image}${val.avatar}`);
        });
        td_1.append(val.id);
        td_2.append(val.email);
        td_3.append(val.usr);
        td_4.append(val.psw);
        td_5.append(val.age);
        td_6.append(val.method);
        td_7.append(avatar_img);
        trBody.append(td_1);
        trBody.append(td_2);
        trBody.append(td_3);
        trBody.append(td_4);
        trBody.append(td_5);
        trBody.append(td_6);
        trBody.append(td_7);
        tbody.append(trBody);
    })

    table.appendChild(caption);
    table.appendChild(thead);
    table.appendChild(tbody);

    div_response.appendChild(table);
    div_container.appendChild(div_response);
}