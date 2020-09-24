const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load dotenv
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount router
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode and on port ${PORT}!`
      .brightYellow.bold
  );
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.brightRed.bold);
  server.close(() => process.exit(1));
});
