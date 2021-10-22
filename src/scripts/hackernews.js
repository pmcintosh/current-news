const path = require("path");
const fs = require("fs");
const Xray = require("x-ray");
const x = Xray();

x("https://news.ycombinator.com/", ".title", [
  {
    title: ".titlelink@text",
    link: ".titlelink@href",
    discuss: "@id",
  },
]).then(function (res) {
  const items = res.map((i) => ({
    ...i,
    discuss: `https://news.ycombinator.com/item?id=${i.discuss}`,
  }));
  const json = JSON.stringify(items, null, 4);
  fs.writeFile(path.join(__dirname, "/output/hackernews.json"), json, (err) => {
    if (err) console.log(err);
  });
});
