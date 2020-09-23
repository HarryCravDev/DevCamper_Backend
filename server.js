const express = require("express");
const dotenv = require("dotenv");

// Load dotenv
dotenv.config({ path: "./config/config.env" });

const app = express();

app.get("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Get all Bootcamps." });
});

app.get("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Get Bootcamp ${req.params.id}.` });
});

app.post("/api/v1/bootcamps", (req, res) => {
  res.status(200).json({ success: true, msg: "Add new Bootcamp." });
});

app.put("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Update Bootcamp ${req.params.id}.` });
});

app.delete("/api/v1/bootcamps/:id", (req, res) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete Bootcamp ${req.params.id}.` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} mode and on port ${PORT}!`
  );
});
