var fs = require("fs");
var Xray = require("x-ray");
var x = Xray();

x("https://news.ycombinator.com/", ".athing", [
  {
    title: ".storylink@text",
    link: ".storylink@href",
    discuss: "@id",
  },
]).then(function (res) {
  const items = res.map((i) => ({
    ...i,
    discuss: `https://news.ycombinator.com/item?id=${i.discuss}`,
  }));
  const json = JSON.stringify(items, null, 4);
  fs.writeFile("src/scripts/output/hackernews.json", json, (err) => {
    if (err) console.log(err);
  });
});
