const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory,
} = require('../controllers/category.controller');

const router = express.Router();

router.use(authMiddleware);

router.get('/', getCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;