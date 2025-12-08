const API = "http://localhost:5000/api";

async function loadTrackArtists() {
    const res = await fetch(`${API}/track-artists`);
    const data = await res.json();
    const table = document.getElementById("taTable");
    table.innerHTML = "";

    data.forEach(t => {
        table.innerHTML += `<tr><td>${t.track}</td><td>${t.artist}</td></tr>`;
    });
}

async function loadTracks() {
    const res = await fetch(`${API}/tracks`);
    const data = await res.json();
    const select = document.getElementById("taTrack");
    select.innerHTML = "";

    data.forEach(t => {
        select.innerHTML += `<option value="${t.track_id}">${t.title}</option>`;
    });
}

async function loadArtists() {
    const res = await fetch(`${API}/artists`);
    const data = await res.json();
    const select = document.getElementById("taArtist");
    select.innerHTML = "";

    data.forEach(a => {
        select.innerHTML += `<option value="${a.artist_id}">${a.name}</option>`;
    });
}

async function saveTrackArtist() {
    const track_id = document.getElementById("taTrack").value;
    const artist_id = document.getElementById("taArtist").value;

    await fetch(`${API}/track-artists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ track_id, artist_id })
    });

    loadTrackArtists();
}

loadTracks();
loadArtists();
loadTrackArtists();
