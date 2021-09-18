var Xray = require("x-ray");
var x = Xray();

x("https://slashdot.org", "article", [
  {
    title: "header h2 .story-title a@text",
    link: "header h2 .story-title .extlnk a@href",
    discuss: "header h2 .story-title a@href",
  },
]).write("src/scripts/output/slashdot.json");
