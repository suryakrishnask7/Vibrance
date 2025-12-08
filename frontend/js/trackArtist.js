const API = "http://localhost:5000/api";

async function loadDropdowns() {
  const [tracksRes, artistsRes] = await Promise.all([
    fetch(`${API}/tracks`),
    fetch(`${API}/artists`)
  ]);

  const tracks = await tracksRes.json();
  const artists = await artistsRes.json();

  trackDropdown.innerHTML = "";
  artistDropdown.innerHTML = "";

  tracks.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.track_id;
    opt.textContent = t.title;
    trackDropdown.appendChild(opt);
  });

  artists.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.artist_id;
    opt.textContent = a.name;
    artistDropdown.appendChild(opt);
  });
}

async function loadMappings() {
  const res = await fetch(`${API}/trackartists`);
  const data = await res.json();

  const table = document.getElementById("assignTable");
  table.innerHTML = "";

  data.forEach(row => {
    table.innerHTML += `
      <tr>
        <td>${row.track}</td>
        <td>${row.artist}</td>
        <td>
          <button class="btn btn-sm btn-danger"
            onclick="removeMapping(${row.track_id}, ${row.artist_id})">
            Remove
          </button>
        </td>
      </tr>
    `;
  });
}

async function assignArtist() {
  const trackId = trackDropdown.value;
  const artistId = artistDropdown.value;

  if (!trackId || !artistId) return alert("Select both values");

  await fetch(`${API}/trackartists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id: trackId, artist_id: artistId })
  });

  loadMappings();
}

async function removeMapping(trackId, artistId) {
  if (!confirm("Remove this mapping?")) return;

  await fetch(`${API}/trackartists`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ track_id: trackId, artist_id: artistId })
  });

  loadMappings();
}

loadDropdowns();
loadMappings();
