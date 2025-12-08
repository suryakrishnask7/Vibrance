const API = "http://localhost:5000/api";

async function loadArtists() {
    const res = await fetch(`${API}/artists`);
    const data = await res.json();
    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    data.forEach(a => {
        table.innerHTML += `
        <tr>
            <td>${a.artist_id}</td>
            <td>${a.name}</td>
            <td>${a.country || "-"}</td>
            <td>
                <button onclick="editArtist(${a.artist_id}, '${a.name}', '${a.country || ""}')">Edit</button>
                <button onclick="deleteArtist(${a.artist_id})">Delete</button>
            </td>
        </tr>`;
    });
}

async function saveArtist() {
    const id = document.getElementById("artistId").value;
    const name = document.getElementById("artistName").value;
    const country = document.getElementById("artistCountry").value;

    if (id) {
        await fetch(`${API}/artists/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, country })
        });
    } else {
        await fetch(`${API}/artists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, country })
        });
    }

    document.getElementById("artistId").value = "";
    loadArtists();
}

function editArtist(id, name, country) {
    document.getElementById("artistId").value = id;
    document.getElementById("artistName").value = name;
    document.getElementById("artistCountry").value = country;
}

async function deleteArtist(id) {
    await fetch(`${API}/artists/${id}`, { method: "DELETE" });
    loadArtists();
}

loadArtists();
