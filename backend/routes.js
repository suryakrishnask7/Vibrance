const express = require("express");
const router = express.Router();
const db = require("./db");

// GET all artists
router.get("/artists", (req, res) => {
  db.query("SELECT * FROM Artist", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD artist
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

// UPDATE artist
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

// DELETE artist
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

// GET all producers
router.get("/producers", (req, res) => {
  db.query("SELECT * FROM Producer", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD producer
router.post("/producers", (req, res) => {
  const { name, company } = req.body;
  db.query(
    "INSERT INTO Producer (name, company) VALUES (?, ?)",
    [name, company],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producer added" });
    }
  );
});

// UPDATE producer
router.put("/producers/:id", (req, res) => {
  const { name, company } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE Producer SET name=?, company=? WHERE producer_id=?",
    [name, company, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producer updated" });
    }
  );
});

// DELETE producer
router.delete("/producers/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM Producer WHERE producer_id=?",
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Producer deleted" });
    }
  );
});

// GET all albums
router.get("/albums", (req, res) => {
  const sql = `
    SELECT Album.*, Producer.name AS producer_name
    FROM Album
    LEFT JOIN Producer ON Album.producer_id = Producer.producer_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD album
router.post("/albums", (req, res) => {
  const { title, release_year, producer_id } = req.body;
  db.query(
    "INSERT INTO Album (title, release_year, producer_id) VALUES (?, ?, ?)",
    [title, release_year, producer_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Album added" });
    }
  );
});

// UPDATE album
router.put("/albums/:id", (req, res) => {
  const { title, release_year, producer_id } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE Album SET title=?, release_year=?, producer_id=? WHERE album_id=?",
    [title, release_year, producer_id, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Album updated" });
    }
  );
});

// DELETE album
router.delete("/albums/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM Album WHERE album_id=?",
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Album deleted" });
    }
  );
});

// GET all tracks
router.get("/tracks", (req, res) => {
  const sql = `
    SELECT Track.*, Album.title AS album_title
    FROM Track
    LEFT JOIN Album ON Track.album_id = Album.album_id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// ADD track
router.post("/tracks", (req, res) => {
  const { title, duration, album_id } = req.body;
  db.query(
    "INSERT INTO Track (title, duration, album_id) VALUES (?, ?, ?)",
    [title, duration, album_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Track added" });
    }
  );
});

// UPDATE track
router.put("/tracks/:id", (req, res) => {
  const { title, duration, album_id } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE Track SET title=?, duration=?, album_id=? WHERE track_id=?",
    [title, duration, album_id, id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Track updated" });
    }
  );
});

// DELETE track
router.delete("/tracks/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM Track WHERE track_id=?",
    [id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Track deleted" });
    }
  );
});

// GET all track-artist mappings
router.get("/trackartists", (req, res) => {
  const sql = `
    SELECT 
      TrackArtists.track_id,
      TrackArtists.artist_id,
      Track.title AS track,
      Artist.name AS artist
    FROM TrackArtists
    JOIN Track ON TrackArtists.track_id = Track.track_id
    JOIN Artist ON TrackArtists.artist_id = Artist.artist_id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


// ASSIGN artist to track
router.post("/trackartists", (req, res) => {
  const { track_id, artist_id } = req.body;
  db.query(
    "INSERT INTO TrackArtists (track_id, artist_id) VALUES (?, ?)",
    [track_id, artist_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Artist assigned to track" });
    }
  );
});

// DELETE track-artist mapping
router.delete("/trackartists", (req, res) => {
  const { track_id, artist_id } = req.body;

  if (!track_id || !artist_id) {
    return res.status(400).json({ message: "track_id and artist_id required" });
  }

  db.query(
    "DELETE FROM TrackArtists WHERE track_id = ? AND artist_id = ?",
    [track_id, artist_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Mapping not found" });
      }

      res.json({ message: "Mapping deleted successfully" });
    }
  );
});


module.exports = router;
