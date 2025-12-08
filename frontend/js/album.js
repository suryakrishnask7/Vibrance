const API = "http://localhost:5000/api";

async function loadAlbums() {
    const res = await fetch(`${API}/albums`);
    const data = await res.json();
    const table = document.getElementById("albumTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
        <tr>
            <td>${a.album_id}</td>
            <td>${a.title}</td>
            <td>${a.release_year}</td>
            <td>${a.producer_name}</td>
            <td>
                <button onclick="editAlbum(${a.album_id}, '${a.title}', ${a.release_year}, ${a.producer_id})">Edit</button>
                <button onclick="deleteAlbum(${a.album_id})">Delete</button>
            </td>
        </tr>`;
    });
}

async function loadProducers() {
    const res = await fetch(`${API}/producers`);
    const data = await res.json();
    const select = document.getElementById("albumProducer");
    select.innerHTML = "";

    data.forEach(p => {
        select.innerHTML += `<option value="${p.producer_id}">${p.name}</option>`;
    });
}

async function saveAlbum() {
    const id = document.getElementById("albumId").value;
    const title = document.getElementById("albumTitle").value;
    const release_year = document.getElementById("albumYear").value;
    const producer_id = document.getElementById("albumProducer").value;

    if (id) {
        await fetch(`${API}/albums/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, release_year, producer_id })
        });
    } else {
        await fetch(`${API}/albums`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, release_year, producer_id })
        });
    }

    document.getElementById("albumId").value = "";
    loadAlbums();
}

async function deleteAlbum(id) {
    await fetch(`${API}/albums/${id}`, { method: "DELETE" });
    loadAlbums();
}

loadAlbums();
loadProducers();
