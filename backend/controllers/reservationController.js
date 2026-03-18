const Reservation = require('../models/reservation');
const catchAsync = require('../utils/catchAsync');
const { sendReservationEmail } = require('../utils/emailService');

const TOTAL_TABLES = 9;
const MAX_GUESTS_PER_TABLE = 4;

const ALLOWED_SLOTS = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", "22:00"
];

const createReservation = catchAsync(async (req, res) => {
    const { name, email, phone, date, timeSlot, guests, tableId } = req.body;

    if (!name || !email || !phone || !date || !timeSlot || !guests) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!ALLOWED_SLOTS.includes(timeSlot)) {
        return res.status(400).json({
            message: `Invalid time slot. Open hours are 08:00 to 22:00 in 30-min intervals.`
        });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
        return res.status(400).json({ message: "Invalid date format. Please use YYYY-MM-DD." });
    }

    if (guests > MAX_GUESTS_PER_TABLE) {
        return res.status(400).json({
            message: `Maximum ${MAX_GUESTS_PER_TABLE} guests per table. For larger groups, please make multiple bookings.`
        });
    }

    const selectedDate = new Date(date);
    const today = new Date();

    if (isNaN(selectedDate.getTime())) {
        return res.status(400).json({ message: "Invalid date value." });
    }

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
        return res.status(400).json({
            message: "Reservations must be made at least 24 hours in advance."
        });
    }

    const bookingsAtThisTime = await Reservation.countDocuments({
        date,
        timeSlot,
        status: { $ne: 'Cancelled' }
    });

    if (bookingsAtThisTime >= TOTAL_TABLES) {
        return res.status(400).json({
            message: "Sorry, fully booked at this time. Please try a different slot."
        });
    }

    const isTableTaken = await Reservation.findOne({
        date,
        timeSlot,
        tableId,
        status: { $ne: 'Cancelled' }
    });

    if (isTableTaken) {
        return res.status(400).json({
            message: `Table ${tableId} is already booked for this time. Please select another.`
        });
    }

    const newReservation = new Reservation({
        name, email, phone, date, timeSlot, guests, tableId,
        status: 'Confirmed'
    });

    const savedReservation = await newReservation.save();

    sendReservationEmail(savedReservation);

    res.status(201).json({
        message: "Table Reserved Successfully!",
        data: savedReservation
    });
});

const getAllReservations = catchAsync(async (req, res) => {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(reservations);
});

const updateStatus = catchAsync(async (req, res) => {
    const { status } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
    );

    if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(updatedReservation);
});

const getAvailableSlots = catchAsync(async (req, res) => {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Date is required" });

    const bookings = await Reservation.find({
        date,
        status: { $ne: 'Cancelled' }
    });

    const availableSlots = ALLOWED_SLOTS.filter(slot => {
        const count = bookings.filter(b => b.timeSlot === slot).length;
        return count < TOTAL_TABLES;
    });

    res.status(200).json(availableSlots);
});

const getBookedTables = catchAsync(async (req, res) => {
    const { date, timeSlot } = req.query;

    if (!date || !timeSlot) {
        return res.status(400).json({ message: "Date and Time are required" });
    }

    if (!ALLOWED_SLOTS.includes(timeSlot)) {
        return res.status(400).json({ message: "Invalid time slot provided." });
    }

    const reservations = await Reservation.find({
        date,
        timeSlot,
        status: { $ne: 'Cancelled' }
    });

    const bookedTableIds = reservations.map(res => res.tableId);

    res.status(200).json(bookedTableIds);
});

module.exports = {
    createReservation,
    getAllReservations,
    updateStatus,
    getAvailableSlots,
    getBookedTables
}