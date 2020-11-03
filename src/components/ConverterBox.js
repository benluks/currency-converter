import React from "react";
import Dropdown from "./Dropdown";

export default function ConverterBox(props) {
  const {
    currencyOptions,
    selectedCurrency,
    converterBoxClassName,
    handleSelectCurrency,
    id,
    index,
    inputChange,
    inputFocus,
    inputValue,
  } = props;
  return (
    <div className={converterBoxClassName} id={id} key={id}>
      <div className="search-bar">
        <input
          type="number"
          value={inputValue}
          onChange={inputChange}
          onFocus={inputFocus}
          id={id}
        />
      </div>
      <Dropdown
        id={id}
        key={index}
        selectedCurrency={selectedCurrency}
        inputValue={inputValue}
        currencyOptions={currencyOptions}
        handleCurrencyClick={handleSelectCurrency}
      />
    </div>
  );
}
