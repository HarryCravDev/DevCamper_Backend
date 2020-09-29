const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Load dotenv
dotenv.config({ path: "./config/config.env" });

// Connect to Database
connectDB();

// Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// File Uploading
app.use(fileupload());

app.use(express.static(path.join(__dirname, "public")));

// Mount router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

app.use(errorHandler);

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
