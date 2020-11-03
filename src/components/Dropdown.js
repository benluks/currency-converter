import React, { useState } from "react";

export default function Dropdown(props) {
  const {
    selectedCurrency,
    currencyOptions,
    handleCurrencyClick,
    id,
    index,
  } = props;

  const [dropDownOpen, setDropDownOpen] = useState(false);

  const handleCurrencyOptionClick = () => setDropDownOpen(!dropDownOpen);

  const closeMenu = () => setDropDownOpen(false);

  let filteredCurrencyOptions = currencyOptions.filter(
    (option) => option !== selectedCurrency
  );

  return (
    <div className="dropdown-container" key={id}>
      <div
        className="currency-option selected-currency"
        key={index}
        onClick={handleCurrencyOptionClick}
      >
        <span className="currency-text selected">{selectedCurrency}</span>
      </div>
      <div
        className={`currency-dropdown ${dropDownOpen ? "show" : ""}`}
        key={id}
      >
        {filteredCurrencyOptions.map((currency, index) => {
          return (
            <div
              className="currency-option unselected"
              key={index}
              id={id}
              onClick={handleCurrencyClick}
            >
              <span
                className="currency-text"
                onClick={closeMenu}
                id={id}
                key={index}
              >
                {currency}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
