const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description
        });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            req.body,
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
