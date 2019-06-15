const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, mongoURI } = require("./config");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Our routes
const User = require("./routes/user");
app.use("/users", User);

// Connect to mongoDb
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDb connected");
  })
  .catch(err => {
    console.log(err);
  });
mongoose.set("useFindAndModify", false);

// Connect to the server
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
