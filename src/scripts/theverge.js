var Xray = require("x-ray");
var x = Xray();

x("https://www.theverge.com/", "h2", [
  {
    title: "a@text",
    link: "a@href",
  },
]).write("src/scripts/output/verge.json");
