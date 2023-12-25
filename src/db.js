// db.js
const mongoose = require("mongoose");
const querystring = require("querystring");
const { MONGO_USER_NAME ='sandeepemail71', MONGO_USER_PWD ='testTEST@1234$', HOST = 'cluster0.oo3yurz.mongodb.net', DATABASE='isp-monitor' } = process.env;

// Encode the password
const encodedPassword = querystring.escape(MONGO_USER_PWD);

// Create the MongoDB URI with the encoded password
const MONGO_URI = `mongodb+srv://${MONGO_USER_NAME}:${encodedPassword}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = mongoose.connection;

