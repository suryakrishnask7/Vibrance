const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",     // default XAMPP
  database: "music_db",
  port: 3306
});

db.connect(err => {
  if (err) {
    console.error("Local MySQL Connection Failed:", err);
    return;
  }
  console.log("Vibrance connected to LOCAL MySQL");
});

module.exports = db;
