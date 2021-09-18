const path = require("path");
const Xray = require("x-ray");
const x = Xray();

x("https://www.theverge.com/", "h2", [
  {
    title: "a@text",
    link: "a@href",
  },
]).write(path.join(__dirname, "/output/verge.json"));
