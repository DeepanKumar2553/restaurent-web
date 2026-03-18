require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const createDefaultAdmin = require('./seed');

const globalErrorHandler = require('./middleware/errorMiddleware');
const AppError = require('./utils/AppError');

const menuRoutes = require('./routes/menuRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Restaurant API is running...');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server Error' });
});

app.all(/(.*)/, (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        createDefaultAdmin();
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (err) {
        console.err(err);
    }
};

start();