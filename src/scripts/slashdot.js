const path = require("path");
const Xray = require("x-ray");
const x = Xray();

x("https://slashdot.org", "article", [
  {
    title: "header h2 .story-title a@text",
    link: "header h2 .story-title .extlnk a@href",
    discuss: "header h2 .story-title a@href",
  },
]).write(path.join(__dirname, "/output/slashdot.json"));
