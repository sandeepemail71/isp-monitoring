const mongoose = require("mongoose");

const pingResultSchema = new mongoose.Schema({
  alive: { type: Number, required: true },
  errorMsg: { type: String, default: "" },
});

const pingSchema = new mongoose.Schema({
  timeStamp: Number,
  clientName: String,
  Google: pingResultSchema,
  OpenDNS: pingResultSchema,
  Cloudflare: pingResultSchema,
});

module.exports = mongoose.model("Ping", pingSchema);
