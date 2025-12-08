const API = "http://localhost:5000/api";

async function loadAlbums() {
  const res = await fetch(`${API}/albums`);
  const data = await res.json();

  const dropdown = document.getElementById("albumDropdown");
  dropdown.innerHTML = "";

  data.forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.album_id;
    opt.textContent = a.title;
    dropdown.appendChild(opt);
  });
}

async function loadTracks() {
  const res = await fetch(`${API}/tracks`);
  const data = await res.json();

  const table = document.getElementById("trackTable");
  table.innerHTML = "";

  data.forEach(t => {
    table.innerHTML += `
      <tr>
        <td>${t.title}</td>
        <td>${t.duration || "-"}</td>
        <td>${t.album_title || "-"}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            onclick="editTrack(${t.track_id}, '${t.title.replace(/'/g, "\\'")}', '${t.duration}', '${t.album_id}')">
            Edit
          </button>
          <button class="btn btn-sm btn-danger"
            onclick="deleteTrack(${t.track_id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function saveTrack() {
  const id = trackId.value;
  const title = trackTitle.value.trim();
  const duration = trackDuration.value.trim();
  const albumId = albumDropdown.value;

  if (!title) return alert("Title is required");

  if (id) {
    await fetch(`${API}/tracks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, duration, album_id: albumId })
    });
  } else {
    await fetch(`${API}/tracks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, duration, album_id: albumId })
    });
  }

  resetTrackForm();
  loadTracks();
}

function editTrack(id, title, duration, albumId) {
  trackId.value = id;
  trackTitle.value = title;
  trackDuration.value = duration;
  albumDropdown.value = albumId;
}

async function deleteTrack(id) {
  if (!confirm("Delete this track?")) return;
  await fetch(`${API}/tracks/${id}`, { method: "DELETE" });
  loadTracks();
}

function resetTrackForm() {
  trackId.value = "";
  trackTitle.value = "";
  trackDuration.value = "";
  albumDropdown.selectedIndex = 0;
}

loadAlbums();
loadTracks();
