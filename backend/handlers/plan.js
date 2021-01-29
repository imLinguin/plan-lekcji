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

  if (
    !req.params.klasa ||
    req.params.klasa === "undefined" ||
    Number(req.params.klasa) > 31 ||
    Number(req.params.klasa) < 1
  ) {
    res.status(404);
    res.json({ message: "Not Found" });
    return;
  } else {
    const { birthtime } = fs.statSync(`./dane/${req.params.klasa}.txt`);
    const plan = await parser(req.params.klasa, day, group, rel);
    console.log(day);
    let nextDay = day + 1 <= 5 ? day+1 : 1 ;

    const tommorowPlan = await parser(req.params.klasa, nextDay, group, rel);

    let last = 0;
    for (let i = 0; i < plan.length; i++) {
      if (plan[i + 1] === "" && plan[i]) {
        last = i;
        break;
      }
    }

    if (last < 1) last = plan.length - 1;
    res.status(200);
    res.json({
      array: plan,
      tomorrow: tommorowPlan,
      updatedAt: birthtime,
      last: last,
    });
  }
});
module.exports = router;
