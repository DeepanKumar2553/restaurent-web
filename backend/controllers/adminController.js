const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const loginAdmin = catchAsync(async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (admin && (await bcrypt.compare(password, admin.password))) {
        res.json({
            _id: admin.id,
            username: admin.username,
            token: generateToken(admin._id),
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

const getDashboardStats = catchAsync(async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const [
        menuCount,
        totalBookings,
        todayBookings,
        recentReservations
    ] = await Promise.all([

        MenuItem.countDocuments(),

        Reservation.countDocuments({ status: { $ne: 'Cancelled' } }),

        Reservation.countDocuments({ date: today, status: { $ne: 'Cancelled' } }),

        Reservation.find()
            .sort({ createdAt: -1 })
            .limit(5)
    ]);

    res.status(200).json({
        stats: {
            totalMenu: menuCount,
            totalBookings: totalBookings,
            todayBookings: todayBookings
        },
        recentReservations
    });
});

module.exports = {
    loginAdmin,
    getDashboardStats
}