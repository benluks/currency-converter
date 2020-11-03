import React, { useState } from "react";
import { GoTriangleUp } from "react-icons/go";
import "./BoxCount.css";

export default function BoxCount(props) {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const { counts, selectedCount, handleCountOptionClick } = props;

  const toggleDropDownOpen = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const closeDDMenu = () => setDropDownOpen(false);

  let filteredCounts = counts.filter((count) => count !== selectedCount);

  return (
    <div className="box-count-container">
      <div className="selected-count" onClick={toggleDropDownOpen}>
        <span>{selectedCount}</span>
        <div className={`count-arrow ${dropDownOpen ? "down" : "up"}`}>
          <GoTriangleUp />
        </div>
      </div>
      <div className={`box-count-dropdown ${dropDownOpen ? "open" : "closed"}`}>
        {filteredCounts.map((count, index) => {
          return (
            <div
              className="count-option"
              onClick={handleCountOptionClick}
              key={index}
            >
              <span
                className="count-option-text"
                onClick={closeDDMenu}
                key={index}
              >
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
