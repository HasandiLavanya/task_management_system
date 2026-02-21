const Category = require('../models/category.model');

async function createCategory(req, res) {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ message: 'Name is required' });
        }

        // unique per user
        const exists = await Category.findOne({
            where: { name: name.trim(), userId: req.user.id },
        });
        if (exists) {
            return res.status(400).json({ message: 'You already have a category with this name' });
        }

        const category = await Category.create({
            name: name.trim(),
            userId: req.user.id,
        });

        return res.status(201).json(category);
    } catch (err) {
        console.error('Create category error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function getCategories(req, res) {
    try {
        const categories = await Category.findAll({
            where: { userId: req.user.id },
            order: [['created_at', 'ASC']],
        });
        return res.json(categories);
    } catch (err) {
        console.error('Get categories error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function updateCategory(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findOne({
            where: { id, userId: req.user.id },
        });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        if (name && name.trim()) {
            const exists = await Category.findOne({
                where: {
                    name: name.trim(),
                    userId: req.user.id,
                    id: { [require('sequelize').Op.ne]: id },
                },
            });
            if (exists) {
                return res.status(400).json({ message: 'You already have a category with this name' });
            }
            category.name = name.trim();
        }

        await category.save();
        return res.json(category);
    } catch (err) {
        console.error('Update category error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

async function deleteCategory(req, res) {
    try {
        const { id } = req.params;

        const deleted = await Category.destroy({
            where: { id, userId: req.user.id },
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(204).send();
    } catch (err) {
        console.error('Delete category error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
};