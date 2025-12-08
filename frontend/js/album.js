const API = "http://localhost:5000/api";

async function loadProducers() {
  const res = await fetch(`${API}/producers`);
  const data = await res.json();

  const dropdown = document.getElementById("producerDropdown");
  dropdown.innerHTML = "";

  data.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.producer_id;
    opt.textContent = p.name;
    dropdown.appendChild(opt);
  });
}

async function loadAlbums() {
  const res = await fetch(`${API}/albums`);
  const data = await res.json();

  const table = document.getElementById("albumTable");
  table.innerHTML = "";

  data.forEach(a => {
    table.innerHTML += `
      <tr>
        <td>${a.title}</td>
        <td>${a.release_year || "-"}</td>
        <td>${a.producer_name || "-"}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            onclick="editAlbum(${a.album_id}, '${a.title.replace(/'/g, "\\'")}', '${a.release_year}', '${a.producer_id}')">
            Edit
          </button>
          <button class="btn btn-sm btn-danger"
            onclick="deleteAlbum(${a.album_id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function saveAlbum() {
  const id = document.getElementById("albumId").value;
  const title = document.getElementById("albumTitle").value.trim();
  const year = document.getElementById("albumYear").value;
  const producerId = document.getElementById("producerDropdown").value;

  if (!title) return alert("Title is required");

  if (id) {
    await fetch(`${API}/albums/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, release_year: year, producer_id: producerId })
    });
  } else {
    await fetch(`${API}/albums`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, release_year: year, producer_id: producerId })
    });
  }

  resetAlbumForm();
  loadAlbums();
}

function editAlbum(id, title, year, producerId) {
  albumId.value = id;
  albumTitle.value = title;
  albumYear.value = year;
  producerDropdown.value = producerId;
}

async function deleteAlbum(id) {
  if (!confirm("Delete this album?")) return;
  await fetch(`${API}/albums/${id}`, { method: "DELETE" });
  loadAlbums();
}

function resetAlbumForm() {
  albumId.value = "";
  albumTitle.value = "";
  albumYear.value = "";
  producerDropdown.selectedIndex = 0;
}

loadProducers();
loadAlbums();
