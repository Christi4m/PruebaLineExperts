import React from "react";
import "./HorizontalLines.scss";

interface HorizontalLinesProps {
  currentRoute: string;
}

const HorizontalLines: React.FC<HorizontalLinesProps> = ({ currentRoute }) => {
  const firstLineColor =
    currentRoute === "upload" || currentRoute === "process"
      ? "#00b5e2"
      : "grey";
  const secondLineColor =
    currentRoute === "list" || currentRoute === "process" ? "#00b5e2" : "grey";

  return (
    <div className="lines-container alc al-c">
      <hr className="line" style={{ borderColor: firstLineColor }} />
      <hr className="line" style={{ borderColor: secondLineColor }} />
    </div>
  );
};

export default HorizontalLines;
