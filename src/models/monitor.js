const mongoose = require("mongoose");

const pingResultSchema = new mongoose.Schema({
  alive: { type: Number, required: true },
  errorMsg: { type: String, default: "" },
});

const monitorSchema = new mongoose.Schema({
  timeStamp: Number,
  Google: pingResultSchema,
  OpenDNS: pingResultSchema,
  Cloudflare: pingResultSchema,
  Quad9: pingResultSchema,
});

module.exports = mongoose.model("Monitor", monitorSchema);
