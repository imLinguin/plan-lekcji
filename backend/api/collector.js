const fs = require("fs/promises");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
module.exports = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let content = [];
  for (let i = 1; i <= 31; i++) {
    await page.goto(
      `http://www.elektronik.rzeszow.pl/plan-lekcji-2/plany/o${i}.html`
    );

    const $ = cheerio.load(await page.content());
    content = $(".tabela").text().trim().split("\n");
    content.splice(0, 9);

    for (let j = 0; j < content.length; j++) {
      if (!content[j].match("BHP"))
        content[j] = content[j].replace(/([A-Z](Ś|[a-z]|[A-Z]))|(#\w{3})/g, "");
      content[j].trim();
    }

    await fs.writeFile(`./dane/${i}.txt`, content.join("\n"));
  }
  await browser.close();
  console.log("YOINKED!");
};
