
import { useState, useCallback } from 'react';
import { message } from 'antd';

export default function useCurrency() {
  let initQuery = [];
  if (localStorage.getItem('query')){
    initQuery = JSON.parse(localStorage.getItem('query'));
  } else {
    initQuery = ['IDR', 'GBP'];
    localStorage.setItem('query', JSON.stringify(initQuery));
  }

  const [value, setValue] = useState('10'); // initial default value
  const [query, setQuery] = useState(initQuery); // set target currency
  const [isAdding, addCurrency] = useState(false); // toggle add new target currency
  const [newCurrency, selectCurrency] = useState(''); // new target currency selection

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

  return [onAddCurrency, onRemoveCurrency, addCurrency, value, setValue, selectCurrency, isAdding, query]
}