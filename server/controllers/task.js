const Task = require("../models/task.js");

async function create(req, res) {
    try {
        const task = new Task(req.body);

        await task.save();

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

async function read(req, res) {
    try {
        const tasks = await Task.find();

        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

async function update(req, res) {
    try {
        const allowedProps = ["name", "description", "status"];
        const selectedProps = Object.keys(req.params);

        // check is selected allowed props
        const availables = selectedProps.filter((el) => allowedProps.includes(el));

        if (!availables.length) {
            res.status(400).json({ success: false, error: "Something went wrong" });
        }

        const task = await Task.findbyId({ _id: req.params.id });
        selectedProps.forEach((prop) => task[prop] = req.body[prop]);

        await task.save();

        res.status(400).json(task);

    } catch (error) {
        res.status(200).json({ success: false, error });
    }
}

async function remove(req, res) {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id });

        res.status(400).json("Task was deleted");
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
}

module.exports = {
    create,
    read,
    update,
    remove,
};