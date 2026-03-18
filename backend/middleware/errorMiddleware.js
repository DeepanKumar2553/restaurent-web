const AppError = require('../utils/AppError');

// --- DB ERROR HANDLERS ---

// 1. Handle Invalid Database IDs (e.g., "Get user with ID: random123")
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

// 2. Handle Duplicate Database Fields (e.g., "Email already exists")
const handleDuplicateFieldsDB = err => {
    // Regex to extract the duplicate value between quotes
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
};

// 3. Handle Mongoose Validation Errors (e.g., "Password too short")
const handleValidationErrorDB = err => {
    // Combine all error messages into one string
    const errors = Object.values(err.errors).map(el => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400);
};

// 4. Handle JWT Errors
const handleJWTError = () =>
    new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
    new AppError('Your token has expired! Please log in again.', 401);

// --- MAIN HANDLER ---

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorProd = (err, res) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    // B) Programming or other unknown error: don't leak details
    else {
        // 1) Log error to server console (for you to see in Render/Heroku logs)
        console.error('ERROR', err);

        // 2) Send generic message
        res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else {
        // Clone error object to modify it without affecting original
        let error = { ...err };
        error.message = err.message; // Explicitly copy message (sometimes lost in clone)

        // Identify specific Mongoose/JWT errors
        if (err.name === 'CastError') error = handleCastErrorDB(error);
        if (err.code === 11000) error = handleDuplicateFieldsDB(error);
        if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
        if (err.name === 'JsonWebTokenError') error = handleJWTError();
        if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

        sendErrorProd(error, res);
    }
};