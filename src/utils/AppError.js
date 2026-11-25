
export const globalErrorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal server error';

    // PostgreSQL duplicate value error
    if (err.code === '23505') {
        statusCode = 409;
        message = 'This record already exists';
    }

    return res.status(statusCode).json({
        success: false,
        message
    });
};
