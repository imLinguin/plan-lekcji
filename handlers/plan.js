const { Router } = require("express");
const parser = require("../api/parser.js");
const getDay = require("../api/getDay");
const fs = require("fs");
const router = new Router();

router.get("/:klasa", async (req, res) => {
  let day = 1;
  if (!req.query.day) day = getDay();
  else day = Number(req.query.day);
  if (Number(req.params.klasa) > 31 || Number(req.params.klasa) < 1) {
    res.status(404);
    res.send("Not Found");
    return;
  }
  const { birthtime } = fs.statSync(`./dane/${req.params.klasa}.txt`);
  const plan = await parser(req.params.klasa, day);
  res.status(200);
  res.json({
    array: plan,
    updatedAt: birthtime,
  });
});
module.exports = router;
