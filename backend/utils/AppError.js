class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
//instead
//return res.status(404).json({ message: "Item not found" });
//can be used as like this
//return next(new AppError("Item not found", 404));

module.exports = AppError;