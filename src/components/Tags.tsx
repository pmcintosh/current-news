import React from "react";

export interface Props {
  active?: string;
  tags: string[];
  onClick?: (tag: string) => void;
}

const divStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "center",
};

const Tags = ({ active, tags, onClick }: Props) => (
  <div style={divStyle}>
    {tags
      .sort((a, b) => a.localeCompare(b))
      .map((t, k) => (
        <button
          key={k}
          onClick={() => {
            if (onClick) onClick(t);
          }}
          className={t === active ? "block accent round" : "block round"}
        >
          {t}
        </button>
      ))}
  </div>
);

export default Tags;
