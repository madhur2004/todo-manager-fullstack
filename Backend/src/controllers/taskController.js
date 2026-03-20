import Task from "../models/TaskModel.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({
      title,
      description,
      userId: req.userId,
    });

    res.status(201).json(task);
  } catch {
    res.status(500).json({ message: "Error creating task" });
  }
};

// Get All Tasks (only logged in user)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task || task.userId.toString() !== req.userId) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting task" });
  }
};