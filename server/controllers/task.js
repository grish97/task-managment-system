const Task = require("../models/task.js");

async function create(req, res) {
  try {
    const { name, description } = req.body;
    console.log(req.body);
    const task = new Task({
      name,
      description,
      status: "todo",
    });

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
    const selectedProps = Object.keys(req.body);

    // check is selected allowed props
    const availables = selectedProps.filter((el) => allowedProps.includes(el));

    if (!availables.length) {
      res
        .status(400)
        .json({ success: false, error: "No any field for update" });
      return;
    }

    const task = await Task.findById({ _id: req.params.id });

    if (!task) {
      res.status(400).json({ success: false, error: "Task not found" });
      return;
    }

    selectedProps.forEach((prop) => (task[prop] = req.body[prop]));

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function remove(req, res) {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });

    res.status(200).json({
      success: true,
    });
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
