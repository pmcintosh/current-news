import React from "react";
import axios from "axios";
import path from "path";
import fs from "fs";

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, "src", "index.tsx"),
  getSiteData: async () => {
    const json = fs.readFileSync("src/scripts/output/news.json");
    const data = JSON.parse(json);
    console.log("data loaded");
    return data;
  },
  Document: ({
    Html,
    Head,
    Body,
    children,
    state: { siteData, renderMeta },
  }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scal=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/blocks.css/dist/blocks.min.css"
        />
        <title>Current News</title>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  plugins: [
    "react-static-plugin-typescript",
    [
      require.resolve("react-static-plugin-source-filesystem"),
      {
        location: path.resolve("./src/pages"),
      },
    ],
    require.resolve("react-static-plugin-reach-router"),
    require.resolve("react-static-plugin-sitemap"),
  ],
};
