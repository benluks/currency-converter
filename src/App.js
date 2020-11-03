import React, { useEffect, useState } from "react";
import "./App.css";
import BoxCount from "./components/BoxCount";
import ConverterBox from "./components/ConverterBox";
import FloatingCurrencies from "./components/FloatingCurrencies";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState();
  const [boxCounts, setBoxCounts] = useState([]);
  const [countOfBoxes, setCountOfBoxes] = useState(2);
  const [converters, setConverters] = useState([]);
  const [activeBox, setActiveBox] = useState();
  const [values, setValues] = useState([]);

  useEffect(() => {
    fetch("https://api.exchangeratesapi.io/latest")
      .then((res) => res.json())
      .then((data) => {
        const currencies = [data.base, ...Object.keys(data.rates)];
        const boxes = [];
        const countOfBoxes = 2;
        const rates = data.rates;
        for (var i = 0; i <= currencies.length; i++) {
          boxes.push(i);
        }
        setBoxCounts([...boxes]);
        setCurrencyOptions(currencies);
        setExchangeRates(data.rates);
        setConverters(
          boxes.map((box, index) => ({
            id: Math.floor(Math.random() * 10000),
            selectedCurrency: currencies[index],
            visible: index < countOfBoxes ? true : false,
          }))
        );
        setValues(boxes.map((box, index) => rates[currencies[index]] || 1));
      });
  }, []);

  useEffect(() => {
    setConverters(
      converters.map((converter, index) => ({
        ...converter,
        visible: index < countOfBoxes ? true : false,
      }))
    );
  }, [countOfBoxes]);

  //get converter from id
  function matchingIdConverter(id) {
    return converters.filter((converter) => converter.id === parseInt(id))[0];
  }

  const changeCount = (e) => setCountOfBoxes(parseInt(e.target.textContent));

  function adjustValues(val) {
    const activeRate = activeBox
      ? exchangeRates[matchingIdConverter(activeBox).selectedCurrency] || 1
      : exchangeRates[converters[0].selectedCurrency];
    const quotient = val / activeRate;

    setValues(
      converters.map((converter, index) => {
        if (converter.id === activeBox) {
          return val;
        } else {
          return quotient * (exchangeRates[converter.selectedCurrency] || 1);
        }
      })
    );
  }

  const selectCurrency = (e) => {
    setConverters(
      converters.map((converter) => {
        if (parseInt(e.target.id) === converter.id)
          converter.selectedCurrency = e.target.textContent;
        return converter;
      })
    );

    const activeValue = activeBox
      ? values[converters.indexOf(matchingIdConverter(activeBox))]
      : values[0];

    adjustValues(activeValue);
  };

  //input focus and change

  const handleInputFocus = (e) => setActiveBox(parseInt(e.target.id));

  const handleInputChange = (e) => {
    adjustValues(e.target.value);
  };

  return (
    <div className="App">
      <FloatingCurrencies />
      <BoxCount
        counts={boxCounts}
        selectedCount={countOfBoxes}
        handleCountOptionClick={changeCount}
      />
      <div className="converter-boxes-container">
        {converters.map((converter, index) => (
          <ConverterBox
            key={converter.id}
            id={converter.id}
            index={index}
            converterBoxClassName={`converter-box-container ${
              converter.visible ? "show" : "hide"
            }`}
            currencyOptions={currencyOptions}
            selectedCurrency={converter.selectedCurrency}
            handleSelectCurrency={selectCurrency}
            inputFocus={handleInputFocus}
            inputChange={handleInputChange}
            inputValue={values[index] === 0 ? "" : values[index]}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
