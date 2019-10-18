import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './home.css';
import { Button, Spin, message } from 'antd';
import Header from '../Header';
import rateList from './list.json';
import CurrencyOption from '../commons/Select';
import ActionButton from '../commons/ActionButton';
import EmptyContainer from '../commons/EmptyContainer';
import CurrencyList from '../commons/CurrencyList';

/**
 * Home component
 * 
 */

const Home = () => {
  // set initial target currency
  let initQuery = [];
  if (localStorage.getItem('query')){
    initQuery = JSON.parse(localStorage.getItem('query')); // get initial target currency from localstorage if exist
  } else {
    initQuery = ['IDR', 'GBP']; // default target currency
    localStorage.setItem('query', JSON.stringify(initQuery)) // set target currency to localstorage
  }
  
  const [value, setValue] = useState('10'); // initial default value
  const [rates, setRates] = useState({}); // rates data from api
  const [query, setQuery] = useState(initQuery); // set target currency
  const [isLoading, setIsLoading] = useState(false); // loading
  const [isAdding, addCurrency] = useState(false); // toggle add new target currency
  const [newCurrency, selectCurrency] = useState(''); // new target currency selection

  useEffect(() => {
    // fetch rates api
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // fetch data from api based on query (target currency)
        const result = await axios(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${query.join(',')}`);
        setRates(result.data.rates);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
        message.error('Cannot connect to API');
      }
    };
    fetchData();
  }, [query]);

  const onAddCurrency = useCallback(() => {
    // adding new currency
    if (query.indexOf(newCurrency) === -1) {
      setQuery([...query, newCurrency]);
      localStorage.setItem('query', JSON.stringify([...query, newCurrency]));
      message.success('Currency added');
    } else {
      message.info('Currency already exist');
    }
    addCurrency(!isAdding);
  }, [query, newCurrency, isAdding]);

  const onRemoveCurrency = (e, currency) => {
    // remove target currency
    e.preventDefault();
    const newQuery = query.filter(item => item !== currency);
    localStorage.setItem("query", JSON.stringify(newQuery));
    setQuery(newQuery);
    message.success('Currency removed');
  };

  return (
    <div className="home">
      <Header value={value} onChange={value => setValue(value)} limit={15} />
      <div className="home-content"> 
        {query.length === 0 ? (
          <EmptyContainer title="Add some currency" />
        ) : !isLoading ? (
          <CurrencyList rates={rates} query={query} value={value} rateList={rateList} onRemove={onRemoveCurrency} /> 
        ) : (
          <Spin />
        )}
      </div>
      <div className="home-action">
        {!isAdding ? (
          <ActionButton onClick={() => addCurrency(!isAdding)} title="Add More Currencies" />
        ) : (
          <span className="ant-input-group ant-input-group-compact">
            <CurrencyOption list={rateList} onChange={selectCurrency} />
            <Button type="primary" onClick={onAddCurrency}>
              Submit
            </Button>
          </span>
        )}
      </div>
    </div>
  )
};

export default Home;
