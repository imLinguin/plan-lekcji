const fs = require("fs/promises");
const days = require("../days.json");
module.exports = async (id, day) => {
  const file = await fs.readFile(`./dane/${id}.txt`, "utf-8");
  let text = file;
  text = text.split("\n");
  const lines = days[day]?.split(",");
  let arr = [];
  if (!lines) return [];
  for (line of lines) {
    line = Number(line);
    let n = text[line - 1];

    if (!n) break;

    arr.push(n);
  }
  return arr;
};
