const express = require("express");
const router = express.Router();
const db = require("./db");

// ---------------- ARTISTS ----------------
router.get("/artists", (req, res) => {
  db.query("SELECT * FROM Artist", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ✅ ADD ARTIST
router.post("/artists", (req, res) => {
  const { name, country } = req.body;

  db.query(
    "INSERT INTO Artist (name, country) VALUES (?, ?)",
    [name, country],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Artist added" });
    }
  );
});

// ✅ UPDATE ARTIST (THIS FIXES UPDATE)
router.put("/artists/:id", (req, res) => {
  const { name, country } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE Artist SET name=?, country=? WHERE artist_id=?",
    [name, country, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Artist updated" });
    }
  );
});

// ✅ DELETE ARTIST (THIS FIXES DELETE)
router.delete("/artists/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM Artist WHERE artist_id=?",
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Artist deleted" });
    }
  );
});


// ---------------- PRODUCERS ----------------
router.get("/producers", (req, res) => {
    db.query("SELECT * FROM Producer", (err, data) => {
        if (err) return res.json(err);
        res.json(data);
    });
});

router.post("/producers", (req, res) => {
    const { name, company } = req.body;
    db.query(
        "INSERT INTO Producer (name, company) VALUES (?, ?)",
        [name, company],
        err => {
            if (err) return res.json(err);
            res.json({ message: "Producer added" });
        }
    );
});

// ---------------- ALBUMS ----------------
router.get("/albums", (req, res) => {
    db.query(
        `SELECT Album.*, Producer.name AS producer_name
         FROM Album JOIN Producer
         ON Album.producer_id = Producer.producer_id`,
        (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        }
    );
});

router.post("/albums", (req, res) => {
    const { title, release_year, producer_id } = req.body;
    db.query(
        "INSERT INTO Album (title, release_year, producer_id) VALUES (?, ?, ?)",
        [title, release_year, producer_id],
        err => {
            if (err) return res.json(err);
            res.json({ message: "Album added" });
        }
    );
});

// ---------------- TRACKS ----------------
router.get("/tracks", (req, res) => {
    db.query(
        `SELECT Track.*, Album.title AS album_title
         FROM Track JOIN Album
         ON Track.album_id = Album.album_id`,
        (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        }
    );
});

router.post("/tracks", (req, res) => {
    const { title, duration, album_id } = req.body;
    db.query(
        "INSERT INTO Track (title, duration, album_id) VALUES (?, ?, ?)",
        [title, duration, album_id],
        err => {
            if (err) return res.json(err);
            res.json({ message: "Track added" });
        }
    );
});

// ---------------- TRACK-ARTISTS (M:N) ----------------
router.get("/track-artists", (req, res) => {
    db.query(
        `SELECT Track.title AS track, Artist.name AS artist
         FROM TrackArtists
         JOIN Track ON TrackArtists.track_id = Track.track_id
         JOIN Artist ON TrackArtists.artist_id = Artist.artist_id`,
        (err, data) => {
            if (err) return res.json(err);
            res.json(data);
        }
    );
});

router.post("/track-artists", (req, res) => {
    const { track_id, artist_id } = req.body;
    db.query(
        "INSERT INTO TrackArtists (track_id, artist_id) VALUES (?, ?)",
        [track_id, artist_id],
        err => {
            if (err) return res.json(err);
            res.json({ message: "Track-Artist linked" });
        }
    );
});

module.exports = router;
