var Xray = require("x-ray");
var x = Xray();

x("https://www.14news.com", "h4.headline", [
  {
    title: "a@text",
    link: "a@href",
  },
]).write("src/scripts/output/14news.json");
