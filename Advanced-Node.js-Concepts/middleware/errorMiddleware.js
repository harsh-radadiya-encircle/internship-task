const errorMiddleware = (err, req, res, next) => {
    // Log the error for the developer
    console.error(err.stack || err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((val) => val.message).join(", ");
    }

    // Mongoose Duplicate Key (e.g. unique email)
    if (err.code === 11000) {
        statusCode = 400;
        message = "Email already exists";
    }

    // Mongoose Bad ObjectId CastError
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Resource not found with id of ${err.value}`;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

module.exports = errorMiddleware;
