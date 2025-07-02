const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    if (!title || !description || !priority || !dueDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const task = new Task({ title, description, priority, dueDate, completed });
    await task.save();
    if (!task) {
      return res.status(500).json({ error: 'Failed to create task' });
    }
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const removeTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const updateTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, completed } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(req.params.id,
      { title, description, priority, dueDate, completed },
      { new: true });

    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getTasks,
  createTask,
  removeTask,
  updateTask,
  getTaskById
}
