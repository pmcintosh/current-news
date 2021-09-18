const fs = require("fs");
const childProcess = require("child_process");

function runScript(scriptPath, callback) {
  // keep track of whether callback has been invoked to prevent multiple invocations
  var invoked = false;
  var process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on("error", function (err) {
    if (invoked) return;
    invoked = true;
    callback(err);
  });

  // execute the callback once the process has finished running
  process.on("exit", function (code) {
    if (invoked) return;
    invoked = true;
    var err = code === 0 ? null : new Error("exit code " + code);
    callback(err);
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

// Now we can run a script and invoke a callback when complete, e.g.
const scripts = [
  "14news.js",
  "github.js",
  "hackernews.js",
  "reddit.js",
  "slashdot.js",
  "theverge.js",
];
scripts.forEach((s) => {
  runScript(`./src/scripts/${s}`, function (err) {
    if (err) throw err;
    console.log(`finished running ${s}`);
  });
});

let data = loadFile("./src/scripts/output/14news.json");
data = data.concat(loadFile("./src/scripts/output/github.json"));
data = data.concat(loadFile("./src/scripts/output/hackernews.json"));
data = data.concat(loadFile("./src/scripts/output/reddit.json"));
data = data.concat(loadFile("./src/scripts/output/slashdot.json"));
data = data.concat(loadFile("./src/scripts/output/verge.json"));
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
        tag = hostname.toString().includes("ycombinator") ? "hackernews" : tag;
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
