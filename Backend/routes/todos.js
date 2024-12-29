const express = require("express");
const router = express.Router();
const db = require("../db/database.js");

// Get all todos
router.get("/", (req, res) => {
  db.all("SELECT * FROM todos", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new todo
router.post("/", (req, res) => {
  const { title } = req.body;
  db.run("INSERT INTO todos (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title, completed: false });
  });
});

// Update a todo's completion status
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.run("UPDATE todos SET completed = ? WHERE id = ?", [completed, id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updated: this.changes });
  });
});

router.get("/", (req, res) => {
    db.all("SELECT * FROM todos", [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    });
  });
  

router.post("/", (req, res) => {
    const { title, priority, datetime } = req.body;
    db.run(
      "INSERT INTO todos (title, priority, datetime) VALUES (?, ?, ?)",
      [title, priority, datetime],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, title, priority, datetime, completed: false });
      }
    );
  });

  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, priority, datetime } = req.body;
  
    db.run(
      "UPDATE todos SET title = ?, priority = ?, datetime = ? WHERE id = ?",
      [title, priority, datetime, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "To-do updated successfully!" });
      }
    );
  });
  

// Delete a todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM todos WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;
