const API = "http://localhost:5000/api";

async function loadArtists() {
  const res = await fetch(`${API}/artists`);
  const data = await res.json();

  const table = document.getElementById("artistTable");
  table.innerHTML = "";

  data.forEach(a => {
    table.innerHTML += `
      <tr>
        <td>${a.name}</td>
        <td>${a.country || "-"}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            onclick="editArtist(${a.artist_id}, '${a.name.replace(/'/g, "\\'")}', '${(a.country || "").replace(/'/g, "\\'")}')">
            Edit
          </button>
          <button class="btn btn-sm btn-danger"
            onclick="deleteArtist(${a.artist_id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function saveArtist() {
  const id = document.getElementById("artistId").value;
  const name = document.getElementById("artistName").value.trim();
  const country = document.getElementById("artistCountry").value.trim();

  if (!name) return alert("Name is required");

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

  resetForm();
  loadArtists();
}

function editArtist(id, name, country) {
  artistId.value = id;
  artistName.value = name;
  artistCountry.value = country;
}

async function deleteArtist(id) {
  if (!confirm("Delete this artist?")) return;
  await fetch(`${API}/artists/${id}`, { method: "DELETE" });
  loadArtists();
}

function resetForm() {
  artistId.value = "";
  artistName.value = "";
  artistCountry.value = "";
}

loadArtists();
