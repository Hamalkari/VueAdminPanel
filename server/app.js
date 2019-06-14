const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { PORT } = require("./config");

const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the server
app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
