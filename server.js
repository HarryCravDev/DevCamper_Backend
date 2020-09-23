const express = require("express");
const dotenv = require("dotenv");

// Route files
const bootcamps = require("./routes/bootcamps");

// Load dotenv
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount router
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode and on port ${PORT}!`
  );
});
