import React from "react";

const divStyle = {
  marginLeft: "1rem",
  marginRight: "1rem",
};

const FancyDiv: React.FC = ({ children }) => {
  return <div style={divStyle}>{children}</div>;
};
export default FancyDiv;
