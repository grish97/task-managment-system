const express = require("express");
const cors = require("cors");

// Environment configs
const dotenv = require("dotenv");
dotenv.config();

// DB Connection
require("./db/db.js");

// Routes
const taskRoutes = require("./routes/task.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/task", taskRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.listen(8000);
