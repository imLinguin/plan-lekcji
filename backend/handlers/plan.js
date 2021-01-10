const { Router } = require("express");
const parser = require("../api/parser.js");
const getDay = require("../api/getDay");
const fs = require("fs");
const router = new Router();

router.get("/:klasa", async (req, res) => {
  let day = req.query.day ? Number(req.query.day) : getDay(); //jednoliniowy if 😯
  let group = req.query.group ? String(req.query.group) : "0";
  group = group.split(",");
  let rel = req.query.rel ? req.query.rel === "true" : true;

  if (Number(req.params.klasa) > 31 || Number(req.params.klasa) < 1) {
    res.status(404);
    res.json({ message: "Not Found" });
    return;
  }
  const { birthtime } = fs.statSync(`./dane/${req.params.klasa}.txt`);
  const plan = await parser(req.params.klasa, day, group, rel);
  res.status(200);
  res.json({
    array: plan,
    updatedAt: birthtime,
  });
});
module.exports = router;
