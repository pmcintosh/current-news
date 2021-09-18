var fs = require("fs");
var Xray = require("x-ray");
var x = Xray();

function cleanup(title) {
  const temp = title.replaceAll("\n", "").trim();
  return temp
    .split("/")
    .map((s) => s.trim())
    .join(" / ");
}

x("https://github.com/trending", "h1.h3.lh-condensed", [
  {
    title: "a@text",
    link: "a@href",
  },
]).then(function (res) {
  const items = res.map((i) => ({ ...i, title: cleanup(i.title) }));
  const json = JSON.stringify(items, null, 4);
  fs.writeFile("src/scripts/output/github.json", json, (err) => {
    if (err) console.log(err);
  });
});
