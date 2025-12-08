const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ API routes
app.use("/api", routes);

// ✅ Serve frontend automatically
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(5000, () => {
    console.log("✅ Vibrance running at http://localhost:5000");
});
