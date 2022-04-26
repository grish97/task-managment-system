const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.js");
const userRoutes = require("./routes/auth.js");
require("./db/db.js");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/task", taskRoutes);

app.use("/api/user", userRoutes);

app.listen(8000);

