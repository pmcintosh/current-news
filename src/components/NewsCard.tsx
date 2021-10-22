import React from "react";
import { News } from "types";

export interface Props {
  news: News;
}

const NewsCard = ({ news }: Props) => (
  <div className="card block fixed">
    <div className="news-header-container">
      <h2 className="news-header">
        <img src={news.favicon} alt="favicon" />
        <a href={news.link}>{news.title}</a>
      </h2>
      <p>{news.tags}</p>
    </div>
    <div className="news-button-container">
      {news.discuss.map((d, k) => {
        if (d !== news.link) {
          const url = new URL(d);
          return (
            <a key={k} className="news-button block" href={d}>
              {url.hostname}
            </a>
          );
        }

        return null;
      })}
    </div>
  </div>
);

export default NewsCard;
