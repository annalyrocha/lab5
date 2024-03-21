import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = `https://min-api.cryptocompare.com/data/price?api_key=${API_KEY}`;

const CoinInfo = ({ image, name, symbol }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const getCoinPrice = async () => {
      try {
        const URL = `${BASE_URL}&fsym=${symbol}&tsyms=USD`;
        const response = await fetch(URL);
        const data = await response.json();
        setPrice(data);
      } catch (error) {
        console.error("Error fetching coin price:", error);
      }
    };

    getCoinPrice();
  }, [symbol]);

  return (
    <div>
      {price ? (
        <li className="main-list" key={symbol}>
          <img
            className="icons"
            src={`https://www.cryptocompare.com${image}`}
            alt={`Small icon for ${name} crypto coin`}
          />
          {name} <span className="tab">${price.USD} USD</span>
        </li>
      ) : null}
    </div>
  );
};

export default CoinInfo;