import React from "react";
import Currency from "react-currency-icons";
import "./FloatingCurrencies.css";

const symbols = [
  "USD",
  "INR",
  "EUR",
  "GBP",
  "RUB",
  "KRW",
  "CRC",
  "VND",
  "AWG",
  "PYG",
  "LAK",
  "ITL",
  "NGN",
  "MXN",
  "CNY",
  "ILS",
  "TWD",
  "KZT",
];

function FloatingCurrencies() {
  return (
    <>
      <div className="floaters">
        {symbols.map((symbol) => (
          <Currency code={symbol} size="large" />
        ))}
      </div>
    </>
  );
}

export default FloatingCurrencies;
