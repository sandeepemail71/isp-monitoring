const express = require("express");
const router = express.Router();
const Speedtest = require("../models/speedtest");


router.post("/", async (req, res) => {
  try {
    const { timeStamp, clientName, uploadSpeed, downloadSpeed } = req.body;

    const speedtest = new Speedtest({
      timeStamp,
      clientName,
      uploadSpeed,
      downloadSpeed,
    });
    await speedtest.save();
    res.status(200).json(speedtest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Retrieve all todos
router.get("/", async (req, res) => {
  try {
    const speedtest = await Speedtest.find();
    res.status(200).json(speedtest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
