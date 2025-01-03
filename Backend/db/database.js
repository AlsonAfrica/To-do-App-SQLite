const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Initialize the database
const dbPath = path.resolve(__dirname, "todos.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("Database connection failed:", err.message);
  else console.log("Connected to SQLite database");
});



// Create the todos table
db.run(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    priority TEXT NOT NULL CHECK (priority IN ('red', 'yellow', 'green')) DEFAULT 'yellow',
    datetime TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT 0
  )
`);

module.exports = db;
