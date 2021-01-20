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

  if (!req.params.klasa || Number(req.params.klasa) > 31 || Number(req.params.klasa) < 1) {
    res.status(404);
    res.json({ message: "Not Found" });
    return;
  }
  const { birthtime } = fs.statSync(`./dane/${req.params.klasa}.txt`);
  const plan = await parser(req.params.klasa, day, group, rel);
  let last;
  for(let i=0;i<plan.length; i++)
  {
    if(plan[i+1] === "" && plan[i])
    {
      last = i;
      break;
    }
  }
  if(last === 1)
    last=null
  res.status(200);
  res.json({
    array: plan,
    updatedAt: birthtime,
    lastLesson: last,
  });
});
module.exports = router;
