import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './home.css';
import {
  Card,
  Button,
  Spin,
  Icon,
  message,
} from 'antd';
import Header from '../Header';
import rateList from './list.json';
import CurrencyOption from '../commons/Select.js';

const CurrencyItem = ({ name, rates, value, onRemove }) => {
  // target currency list item
  const count = rates[name] * (value || 0);
  const parseCount = count.toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const parseRate = rates[name].toFixed(3).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return (
    <Card
      title={
        <div className="content-container">
          <div className="content-title">
            {name}
          </div>
          <div className="content-value">
            {parseCount}
          </div>
        </div>
      } 
      extra={
        <a href="/" onClick={e => onRemove(e,name)}>
          <Icon type="close-circle" />
        </a>
      } 
      style={{ width: '100%' }}
      >
      <p>{`${name} - ${rateList[name]}`}</p>
      <p>{`1 USD = ${name} ${parseRate}`}</p>
    </Card>
  )
}

const Home = () =>  {
  // set initial target currency
  let initQuery = [];
  if (localStorage.getItem("query")){
    initQuery = JSON.parse(localStorage.getItem("query"));
  } else {
    initQuery = ['IDR','GBP']; // default target currency
    localStorage.setItem("query", JSON.stringify(initQuery));
  }
  
  const [value, setValue] = useState(10.00); // initial default value
  const [rates, setRates] = useState([]); // rates data from api
  const [query, setQuery] = useState(initQuery); // default target currency
  const [isLoading, setIsLoading] = useState(false); // loading
  const [isAdding, addCurrency] = useState(false); // toggle add new target currency
  const [newCurrency, selectCurrency] = useState(''); // new target currency selection

  useEffect(() => {
    // fetch rates api
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${query.join(',')}`);
      setRates(result.data.rates);
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  const onAddCurrency = useCallback(() => {
    // adding new currency
    if (query.indexOf(newCurrency) === -1) {
      setQuery([...query, newCurrency]);
      localStorage.setItem("query", JSON.stringify([...query, newCurrency])); // added item to localstorage
      message.success('Currency added');
    } else {
      message.info('Currency already exist');
    }
    addCurrency(!isAdding);
  }, [query, newCurrency, isAdding]);

  const onRemoveCurrency = (e, currency) => {
    e.preventDefault();
    const newQuery = query.filter(item => item !== currency);
    localStorage.setItem("query", JSON.stringify(newQuery)); // removed item from localstorage
    setQuery(newQuery);
    message.success('Currency removed');
  };

  return (
    <div className="home">
      <Header value={value} onChange={value => setValue(value)} limit={15} />
      <div className="home-content"> 
        { query.length === 0 ? (
          <div className="content-empty">Empty... <br /> Add some currency</div> // if currency empty
        ) : !isLoading ? (
          <div className="content-item">
            {Object.keys(rates).length === query.length
            && query.map((item) =>
              (<CurrencyItem name={item} key={item} rates={rates} value={value} onRemove={onRemoveCurrency} />)
            )}
          </div>
        ) : (
          <Spin /> // loading spinner
        )}
      </div>
      <div className="home-action">
        {!isAdding ? (
          <div onClick={() => addCurrency(!isAdding)} >Add More Currencies</div>
        ) : (
          <div>
            <CurrencyOption list={rateList} onChange={selectCurrency} />
            <Button onClick={onAddCurrency}>Submit</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
