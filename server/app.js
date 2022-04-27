const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/task.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const dotenv = require("dotenv");
require("./db/db.js");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/task", taskRoutes);

app.use("/api/user", authRoutes);

app.use("/user", userRoutes);

app.listen(8000);

