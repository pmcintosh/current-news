const path = require("path");
const fs = require("fs");
const Xray = require("x-ray");
const x = Xray();

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
  fs.writeFile(path.join(__dirname, "/output/github.json"), json, (err) => {
    if (err) console.log(err);
  });
});
