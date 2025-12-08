const API = "http://localhost:5000/api";

// ✅ LOAD ALL ARTISTS
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

// ✅ CREATE + UPDATE (FIXED)
async function saveArtist() {
  const id = document.getElementById("artistId").value;
  const name = document.getElementById("artistName").value.trim();
  const country = document.getElementById("artistCountry").value.trim();

  if (!name) {
    alert("Artist name is required!");
    return;
  }

  // ✅ UPDATE MODE
  if (id) {
    await fetch(`${API}/artists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country })
    });
  }
  // ✅ CREATE MODE
  else {
    await fetch(`${API}/artists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country })
    });
  }

  resetForm();
  loadArtists();
}

// ✅ LOAD DATA INTO FORM (FIXED)
function editArtist(id, name, country) {
  document.getElementById("artistId").value = id;
  document.getElementById("artistName").value = name;
  document.getElementById("artistCountry").value = country;
}

// ✅ DELETE (FIXED)
async function deleteArtist(id) {
  if (!confirm("Are you sure you want to delete this artist?")) return;

  await fetch(`${API}/artists/${id}`, {
    method: "DELETE"
  });

  loadArtists();
}

// ✅ RESET FORM
function resetForm() {
  document.getElementById("artistId").value = "";
  document.getElementById("artistName").value = "";
  document.getElementById("artistCountry").value = "";
}

// ✅ INITIAL LOAD
loadArtists();
