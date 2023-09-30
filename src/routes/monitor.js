const express = require("express");
const router = express.Router();
const Monitor = require("../models/monitor");

const GOOGLE = {
  serverName: "Google",
  server: "8.8.8.8",
};
const OPEN_DNS = {
  serverName: "OpenDNS",
  server: "8.8.4.4",
};
const CLOUDFLARE = {
  serverName: "Cloudflare",
  server: "1.1.1.1",
};
const QUAD9 = {
  serverName: "Quad9",
  server: "9.9.9.9",
};

router.post("/", async (req, res) => {
  try {
    const google = req.body?.[GOOGLE.serverName] || {};
    const openDns = req.body?.[OPEN_DNS.serverName] || {};
    const cloudflare = req.body?.[CLOUDFLARE.serverName] || {};
    const quad9 = req.body?.[QUAD9.serverName] || {};
    const { timeStamp } = req.body;

    const monitor = new Monitor({
      timeStamp,
      [GOOGLE.serverName]: google,
      [OPEN_DNS.serverName]: openDns,
      [CLOUDFLARE.serverName]: cloudflare,
      [QUAD9.serverName]: quad9,
    });
    await monitor.save();
    res.status(200).json(monitor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Retrieve all todos
router.get("/", async (req, res) => {
  try {
    const monitor = await Monitor.find();
    res.status(200).json(monitor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
