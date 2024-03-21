import React, { useState, useEffect } from 'react';
import './App.css';
import CoinInfo from './Components/CoinInfo';

const API_KEY = import.meta.env.VITE_APP_API_KEY;
const BASE_URL = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`;
const BLOCKCHAIN = 'blockchain';

function App() {
  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCoinData();
  }, []);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== '') {
      const filteredData = Object.keys(list.Data).filter((coin) =>
        Object.values(list.Data[coin])
          .join('')
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.keys(list.Data));
    }
  };

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(event) => searchItems(event.target.value)}
      />
      {list &&
        (filteredResults.length > 0
          ? filteredResults.map((coin) =>
              list.Data[coin].PlatformType === BLOCKCHAIN ? (
                <CoinInfo
                  key={coin}
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            )
          : Object.keys(list.Data).map((coin) =>
              list.Data[coin].PlatformType === BLOCKCHAIN ? (
                <CoinInfo
                  key={coin}
                  image={list.Data[coin].ImageUrl}
                  name={list.Data[coin].FullName}
                  symbol={list.Data[coin].Symbol}
                />
              ) : null
            ))}
    </div>
  );
}

export default App;