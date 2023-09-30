const express = require("express");
require("dotenv").config();
require("./src/db"); // Import the database connection module
const pingRoutes = require("./src/routes/ping");
const speedtestRoutes = require("./src/routes/speedtest");

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use("/ping", pingRoutes);
app.use("/speedtest", speedtestRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
