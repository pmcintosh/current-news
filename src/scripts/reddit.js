const axios = require("axios");
const fs = require("fs");

const fetch = async () => {
  const { data: response } = await axios.get(
    "https://reddit.com/r/programming/.json"
  );

  const items = response.data.children.map((c) => ({
    title: c.data.title,
    link: c.data.url,
    discuss: `https://www.reddit.com${c.data.permalink}`,
  }));

  const json = JSON.stringify(items, null, 4);
  fs.writeFile("src/scripts/output/reddit.json", json, (err) => {
    if (err) console.log(err);
  });
};

fetch();
