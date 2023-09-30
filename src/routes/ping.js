const express = require("express");
const router = express.Router();
const Ping = require("../models/ping");

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
    const { timeStamp, clientName } = req.body;

    const ping = new Ping({
      timeStamp,
      clientName,
      [GOOGLE.serverName]: google,
      [OPEN_DNS.serverName]: openDns,
      [CLOUDFLARE.serverName]: cloudflare,
      [QUAD9.serverName]: quad9,
    });
    await ping.save();
    res.status(200).json(ping);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// Retrieve all todos
router.get("/", async (req, res) => {
  try {
    const ping = await Ping.find();
    res.status(200).json(ping);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
