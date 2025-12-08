const API = "http://localhost:5000/api";

async function loadProducers() {
  const res = await fetch(`${API}/producers`);
  const data = await res.json();

  producerTable.innerHTML = "";

  data.forEach(p => {
    producerTable.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.company || "-"}</td>
        <td>
          <button class="btn btn-sm btn-primary"
            onclick="editProducer(${p.producer_id}, '${p.name.replace(/'/g, "\\'")}', '${(p.company || "").replace(/'/g, "\\'")}')">
            Edit
          </button>
          <button class="btn btn-sm btn-danger"
            onclick="deleteProducer(${p.producer_id})">
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

async function saveProducer() {
  const id = producerId.value;
  const name = producerName.value.trim();
  const company = producerCompany.value.trim();

  if (!name) return alert("Name is required");

  if (id) {
    await fetch(`${API}/producers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company })
    });
  } else {
    await fetch(`${API}/producers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, company })
    });
  }

  resetProducerForm();
  loadProducers();
}

function editProducer(id, name, company) {
  producerId.value = id;
  producerName.value = name;
  producerCompany.value = company;
}

async function deleteProducer(id) {
  if (!confirm("Delete this producer?")) return;
  await fetch(`${API}/producers/${id}`, { method: "DELETE" });
  loadProducers();
}

function resetProducerForm() {
  producerId.value = "";
  producerName.value = "";
  producerCompany.value = "";
}

loadProducers();
