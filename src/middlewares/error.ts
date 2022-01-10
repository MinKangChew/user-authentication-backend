import type { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || "Internal Server Error";

	res.status(err.statusCode).json({
		success: false,
		message: err.message,
	});
};

export default errorMiddleware;
