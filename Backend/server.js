const express = require("express");
const cors = require("cors");
const todosRoutes = require("./routes/todos.js");
const UsersRoutes = require("./routes/users.js")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/todos", todosRoutes);
app.use("/api/users", UsersRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
