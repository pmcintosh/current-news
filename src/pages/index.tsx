import NewsCard from "components/NewsCard";
import Tags from "components/Tags";
import React, { useEffect, useState } from "react";
import { useSiteData } from "react-static";
import { News } from "types";

const setItem = (name: string, value: string) => {
  if (typeof document !== "undefined") {
    window.localStorage.setItem(name, value);
  }
};

const getItem = (name: string): string | undefined => {
  if (typeof document !== "undefined") {
    return window.localStorage.getItem(name);
  }
};

export default () => {
  const data = useSiteData();
  if (data === undefined) return <div>Failed to load!</div>;

  const [tag, setTag] = useState<string>(getItem("tag"));
  const [filtered, setFiltered] = useState<News[]>(data.items);

  useEffect(() => {
    setFiltered(data.items.filter((d: News) => d.tags.includes(tag)));
    setItem("tag", tag);
  }, [tag]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Current News</h1>
      <p>Last published {new Date(data.published).toLocaleTimeString()}</p>

      <Tags tags={data.tags} active={tag} onClick={(t) => setTag(t)} />

      <div className="newsWrapper">
        {filtered.map((n: News, i: number) => (
          <NewsCard key={i} news={n} />
        ))}
      </div>
    </div>
  );
};
