const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const plan = require("./handlers/plan");
//require("./api/collector")();
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Go 🏠<h1>");
});

app.use("/plan", plan);

app.put("/updateall", (req, res) => {
  if (!req.query.key || req.query.key !== process.env.PASSWD) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }
  require("./api/collector")();
  res.sendStatus(200);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Listening on http://localhost:" + port);
});
