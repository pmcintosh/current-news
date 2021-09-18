const path = require("path");
const Xray = require("x-ray");
const x = Xray();

x("https://www.14news.com", "h4.headline", [
  {
    title: "a@text",
    link: "a@href",
  },
]).write(path.join(__dirname, "/output/14news.json"));
