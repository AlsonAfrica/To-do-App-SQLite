const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const usersDbPath = path.resolve(__dirname, "users.db");
const usersDb = new sqlite3.Database(usersDbPath, (err) => {
  if (err) console.error("Database connection failed:", err.message);
  else console.log("Connected to Users SQLite database");
});

usersDb.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

module.exports = usersDb;