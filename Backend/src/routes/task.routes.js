const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/task.controller');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.patch('/:id', updateTask); // partial update
router.delete('/:id', deleteTask);

module.exports = router;