const express = require('express');
const router = express.Router();

const {
    getAllItems,
    getItemsByCategory,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes
router.get('/', getAllItems);
router.get('/:category', getItemsByCategory);

// Protected Admin Routes
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;