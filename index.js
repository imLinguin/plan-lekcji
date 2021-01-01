const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const plan = require("./handlers/plan");
//require("./api/collector")();
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Go 🏠<h1>");
});

app.use("/plan", plan);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
