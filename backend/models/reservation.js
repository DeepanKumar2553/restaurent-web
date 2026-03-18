const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
        max: 20
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
        default: 'Confirmed'
    },
    tableId: {
        type: Number,
        required: true,
        min: 1,
        max: 9
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('reservation', reservationSchema);