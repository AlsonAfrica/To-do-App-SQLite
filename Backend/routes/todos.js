const express = require("express");
const router = express.Router();
const db = require("../db/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



const SECRET_KEY = "your_secret_key"

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

// Register a new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({ error: "Username or email already exists" });
          }
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login a user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  // Find the user in the database
  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      // Compare the provided password with the stored hash
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: "Error during login" });
    }
  });
});

module.exports = router;
