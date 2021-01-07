const fs = require("fs/promises");
const days = require("../days.json");
module.exports = async (id, day, group) => {
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

    if (group[0] !== "0") {
      let target = new RegExp(/-\d\/\d/g).exec(n);
      if (target) {
        while (n.match(/-\d\/\d/g)) {
          target = new RegExp(/-\d\/\d/g).exec(n);
          let temp = n.substring(target.index, target.index + 4);
          temp = temp.substr(1);
          let found = false;
          for (let k = 0; k < group.length; k++) {
            if (temp === group[k]) {
              n = n.substring(0, target.index);
              found = true;
            }
          }
          if (!found) n = n.substr(target.index + 4);
        }
      }
    }
    n = n.trim();
    arr.push(n);
  }
  return arr;
};
