const mongoose = require("mongoose");

const speedtestSchema = new mongoose.Schema({
  timeStamp: Number,
  clientName: String,
  uploadSpeed: Number,
  downloadSpeed: Number,
});

module.exports = mongoose.model("Speedtest", speedtestSchema);
