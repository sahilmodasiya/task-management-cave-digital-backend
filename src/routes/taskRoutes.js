const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getTaskById } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id', authMiddleware, getTaskById);
router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;
