// db.js
const mongoose = require("mongoose");
const querystring = require("querystring");
const { MONGO_USER_NAME, MONGO_USER_PWD, HOST, DATABASE } = process.env;

// Encode the password
const encodedPassword = querystring.escape(MONGO_USER_PWD);

// Create the MongoDB URI with the encoded password
const MONGO_URI = `mongodb+srv://${MONGO_USER_NAME}:${encodedPassword}@${HOST}/${DATABASE}?retryWrites=true&w=majority`;

console.log(MONGO_URI);
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
