const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    childProcess.exec(`node ${scriptPath}`, (err, stdout) => {
      if (err) {
        console.log(`script failed: ${scriptPath}`);
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  });
}

function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

function loadFile(path) {
  try {
    const json = fs.readFileSync(path);
    return JSON.parse(json);
  } catch (err) {
    console.log(`Failed to parse file ${path}.`, err);
  }
}

function getFavicon(link) {
  try {
    // https://favicons.githubusercontent.com/
    // https://www.google.com/s2/favicons?domain=
    const url = new URL(link);
    const hostname = url.hostname;
    const favicon = `https://www.google.com/s2/favicons?domain=${hostname.replace(
      "www.",
      ""
    )}`;
    return favicon;
  } catch (err) {
    console.log("bad url", link);
  }
}

async function main() {
  if (!fs.existsSync(path.join(__dirname, "/output")))
    fs.mkdirSync(path.join(__dirname, "/output"));

  // Now we can run a script and invoke a callback when complete, e.g.
  const scripts = [
    "14news.js",
    "github.js",
    "hackernews.js",
    "reddit.js",
    "slashdot.js",
    "theverge.js",
  ];

  const promises = scripts.map((s) => runScript(path.join(__dirname, s)));
  await Promise.all(promises);

  let data = loadFile(path.join(__dirname, "/output/14news.json"));
  data = data.concat(loadFile(path.join(__dirname, "/output/github.json")));
  data = data.concat(loadFile(path.join(__dirname, "/output/hackernews.json")));
  data = data.concat(loadFile(path.join(__dirname, "/output/reddit.json")));
  data = data.concat(loadFile(path.join(__dirname, "/output/slashdot.json")));
  data = data.concat(loadFile(path.join(__dirname, "/output/verge.json")));
  data = groupBy(data, "link");

  let moreThanOne = [];
  const keys = Object.keys(data);
  const items = keys.map((k) => {
    const o = {
      favicon: getFavicon(k),
      title: data[k][0].title,
      link: k,
      discuss: data[k]
        .map((s) => (s.discuss ? s.discuss : ""))
        .filter((s) => s !== ""),
      tags: data[k]
        .map((s) => {
          const url = s.discuss ? new URL(s.discuss) : new URL(s.link);
          const hostname = url.hostname;
          let tag = "";
          tag = hostname.toString().includes("ycombinator")
            ? "hackernews"
            : tag;
          tag = hostname.toString().includes("14news") ? "14news" : tag;
          tag = hostname.toString().includes("slashdot") ? "slashdot" : tag;
          tag = hostname.toString().includes("github") ? "github" : tag;
          tag = hostname.toString().includes("theverge") ? "verge" : tag;
          tag = hostname.toString().includes("reddit") ? "reddit" : tag;
          return tag;
        })
        .join(","),
    };

    return o;
  });

  const output = {
    published: new Date(),
    tags: ["14news", "slashdot", "github", "verge", "reddit", "hackernews"],
    items: items,
  };

  const json = JSON.stringify(output, null, 4);
  try {
    fs.writeFileSync("src/scripts/output/news.json", json);
  } catch (err) {
    console.log(err);
  }
}

main();
