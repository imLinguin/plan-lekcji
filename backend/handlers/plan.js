const { Router } = require("express");
const parser = require("../api/parser.js");
const getDay = require("../api/getDay");
const fs = require("fs");
const router = new Router();

router.get("/:klasa", async (req, res) => {
  let day;
  if(req.query.day) 
    day = Number(req.query.day); 
  else 
    getDay();
  let group;
  if(req.query.group) group = String(req.query.group);
  else
   group="0";
  group = group.split(",");
  let rel; 
  if(req.query.rel)
   rel = req.query.rel === "true";
  else
    rel = true;

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

    let nextDay;
    if(day + 1 <= 5) 
      nextDay = day+1;
    else 
      nextDay = 1 ;

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
      //Zmienić na false jeśli są normalne lekcje. True gdy lekcje skrócone
      short:process.env.SHORT === "true",
    });
  }
});
module.exports = router;
