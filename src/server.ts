import app from "./app";
import logger from "./utils/logger";

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  logger.info(`Error: ${err.message}`);
  logger.info(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

const port = process.env.PORT;

const server = app.listen(port, () =>
  logger.info(`App is running at http://localhost:${port}`)
);

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: any) => {
  logger.info(`Error: ${err.message}`);
  logger.info(`Shutting down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
