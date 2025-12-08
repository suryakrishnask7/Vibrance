const API = "http://localhost:5000/api";

async function loadProducers() {
    const res = await fetch(`${API}/producers`);
    const data = await res.json();
    const table = document.getElementById("producerTable");
    table.innerHTML = "";

    data.forEach(p => {
        table.innerHTML += `
        <tr>
            <td>${p.producer_id}</td>
            <td>${p.name}</td>
            <td>${p.company || "-"}</td>
            <td>
                <button onclick="editProducer(${p.producer_id}, '${p.name}', '${p.company || ""}')">Edit</button>
                <button onclick="deleteProducer(${p.producer_id})">Delete</button>
            </td>
        </tr>`;
    });
}

async function saveProducer() {
    const id = document.getElementById("producerId").value;
    const name = document.getElementById("producerName").value;
    const company = document.getElementById("producerCompany").value;

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

    document.getElementById("producerId").value = "";
    loadProducers();
}

function editProducer(id, name, company) {
    document.getElementById("producerId").value = id;
    document.getElementById("producerName").value = name;
    document.getElementById("producerCompany").value = company;
}

async function deleteProducer(id) {
    await fetch(`${API}/producers/${id}`, { method: "DELETE" });
    loadProducers();
}

loadProducers();
