const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    "name": String,
    "description": String,
    "status": String,
}, { timestamps: true });


const Task = mongoose.model("task", taskSchema);

module.exports = Task;