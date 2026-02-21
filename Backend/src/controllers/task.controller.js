const { Op } = require('sequelize');
const Task = require('../models/task.model');
const Category = require('../models/category.model');
const { STATUS } = require('../models/task.model');

async function createTask(req, res) {
    try {
        const { title, description, status, categoryId, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (status && !STATUS.includes(status)) {
            return res.status(400).json({ message: `Status must be one of: ${STATUS.join(', ')}` });
        }

        let category = null;
        if (categoryId) {
            category = await Category.findOne({
                where: { id: categoryId, userId: req.user.id },
            });
            if (!category) {
                return res.status(400).json({ message: 'Invalid category selected' });
            }
        }

        const task = await Task.create({
            title: title.trim(),
            description: description || '',
            status: status || 'TODO',
            userId: req.user.id,
            categoryId: category ? category.id : null,
            dueDate: dueDate ? new Date(dueDate) : null,
        });

        return res.status(201).json(task);
    } catch (err) {
        console.error('Create task error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function getTasks(req, res) {
    try {
        const { status, category, search, sort } = req.query;

        const where = { userId: req.user.id };

        if (status) {
            where.status = status;
        }
        if (category) {
            where.categoryId = category;
        }
        if (search) {
            where.title = { [Op.like]: `%${search}%` };
        }

        let order = [['created_at', 'DESC']];
        if (sort) {
            const desc = sort.startsWith('-');
            const field = desc ? sort.slice(1) : sort;
            order = [[field, desc ? 'DESC' : 'ASC']];
        }

        const tasks = await Task.findAll({
            where,
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
            ],
            order,
        });

        return res.json(tasks);
    } catch (err) {
        console.error('Get tasks error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function getTaskById(req, res) {
    try {
        const { id } = req.params;

        const task = await Task.findOne({
            where: { id, userId: req.user.id },
            include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.json(task);
    } catch (err) {
        console.error('Get task error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, status, categoryId, dueDate } = req.body;

        const task = await Task.findOne({
            where: { id, userId: req.user.id },
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (title && title.trim()) {
            task.title = title.trim();
        }

        if (typeof description === 'string') {
            task.description = description;
        }

        if (status) {
            if (!STATUS.includes(status)) {
                return res.status(400).json({ message: `Status must be one of: ${STATUS.join(', ')}` });
            }
            task.status = status;
        }

        if (typeof dueDate !== 'undefined') {
            task.dueDate = dueDate ? new Date(dueDate) : null;
        }

        if (typeof categoryId !== 'undefined') {
            if (categoryId === null) {
                task.categoryId = null;
            } else {
                const category = await Category.findOne({
                    where: { id: categoryId, userId: req.user.id },
                });
                if (!category) {
                    return res.status(400).json({ message: 'Invalid category selected' });
                }
                task.categoryId = category.id;
            }
        }

        await task.save();

        return res.json(task);
    } catch (err) {
        console.error('Update task error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function deleteTask(req, res) {
    try {
        const { id } = req.params;

        const deleted = await Task.destroy({
            where: { id, userId: req.user.id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Task not found' });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Delete task error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
};