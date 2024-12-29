const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todos.js");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
