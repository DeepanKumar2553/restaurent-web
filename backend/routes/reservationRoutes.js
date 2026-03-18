const express = require('express');
const router = express.Router();

const {
    createReservation,
    getAllReservations,
    updateStatus,
    getAvailableSlots,
    getBookedTables
} = require('../controllers/reservationController');
const { protect } = require('../middleware/authMiddleware');

// Public Route
router.post('/', createReservation);
router.get('/availability', getAvailableSlots);
router.get('/booked-tables', getBookedTables);

// Protected Admin Routes
router.get('/', protect, getAllReservations);
router.put('/:id', protect, updateStatus);

module.exports = router;