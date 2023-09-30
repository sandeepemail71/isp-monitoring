const express = require("express");
require("dotenv").config();
require("./src/db"); // Import the database connection module
const monitorRoutes = require("./src/routes/monitor"); // Import the monitor routes module

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use("/monitor", monitorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
