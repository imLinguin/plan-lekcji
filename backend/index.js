const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const plan = require("./handlers/plan");
app.disable("x-powered-by");
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1 style="text-align: center; font-size: 5em;">Go 🏠</h1>');
});

app.use("/plan", plan);

app.get("/klasy",(req,res)=>{
  res.status(200);
  res.json({
    "1a":1,
    "1c":2,
    "1d":3,
    "1g":4,
    "1h":5,
    "1i":6,
    "1j":7,
    "2as":8,
    "2bg":9,
    "2cs":10,
    "2dg":11,
    "2gs":12,
    "2hs":13,
    "2ig":14,
    "2jg":15,
    "3a":16,
    "3b":17,
    "3c":18,
    "3d":19,
    "3g":20,
    "3h":21,
    "3i":22,
    "3j":23,
    "4a":24,
    "4c":25,
    "4d":26,
    "4g":27,
    "4h":28,
    "4i":29,
    "4j":30,
    "4k":31
    })
})

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
