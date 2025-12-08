const API = "http://localhost:5000/api";

async function loadArtists() {
    const res = await fetch(`${API}/artists`);
    const data = await res.json();

    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    data.forEach(a => {
        const row = `
            <tr>
                <td>${a.artist_id}</td>
                <td>${a.name}</td>
                <td>${a.country || "-"}</td>
            </tr>`;
        table.innerHTML += row;
    });
}

async function addArtist() {
    const name = document.getElementById("artistName").value;
    const country = document.getElementById("artistCountry").value;

    await fetch(`${API}/artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, country })
    });

    document.getElementById("artistName").value = "";
    document.getElementById("artistCountry").value = "";

    loadArtists();
}

loadArtists();
