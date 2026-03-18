const express = require('express');
const router = express.Router();

const { loginAdmin, getDashboardStats } = require('../controllers/adminController');

// Public
router.post('/login', loginAdmin);

// Protected
router.get('/dashboard', getDashboardStats);

module.exports = router;