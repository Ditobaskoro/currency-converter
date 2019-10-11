import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './home.css';
import Header from '../Header';
import rateList from './list.json';
import { Card, Select, Button, Spin, Icon, message } from 'antd';
const { Option } = Select;

const CurrencyItem = ({name, rates, value}) => {
  //target currency list item
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
        <a href="#">
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

const CurrencyOption = ({rateList, selectCurrency}) => {
  return (
    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a currency"
    optionFilterProp="children"
    onChange={value => selectCurrency(value)}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
      {Object.keys(rateList).map(item => (<Option value={item} key={item}>{item}</Option>))}
    </Select>
  )
}

const Home = () =>  {
  const [value, setValue] = useState(10.00); //initial default value
  const [rates, setRates] = useState([]); //rates data from api
  const [query, setQuery] = useState(['IDR','GBP']); //default target currency
  const [isLoading, setIsLoading] = useState(false); //loading
  const [isAdding, addCurrency] = useState(false); //toggle add new target currency
  const [newCurrency, selectCurrency] = useState(''); //new target currency selection

  useEffect(() => {
    //fetch rates api
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${query.join(',')}`);
      setRates(result.data.rates);
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  const onAddCurrency = useCallback(() => {
    //adding new currency
    if(query.indexOf(newCurrency) === -1){
      setQuery([...query, newCurrency]);
      message.success('Currency added');
    } else {
      message.info('Currency already exist');
    }
    addCurrency(!isAdding);
  }, [query, newCurrency, isAdding]);

  return (
    <div className="home">
      <Header value={value} onChange={value => setValue(value)} />
      <div className="home-content"> 
        {!isLoading ? (
          <div className="content-item">
            {Object.keys(rates).length === query.length && query.map((item, index)  => (<CurrencyItem name={item} key={index} rates={rates} value={value} />))}
          </div>
        ) : (
          <Spin /> 
        )}
      </div>
      <div className="home-action">
        {!isAdding ? (
          <div onClick={() => addCurrency(!isAdding)} >Add More Currencies</div>
        ) : (
          <div>
            <CurrencyOption rateList={rateList} selectCurrency={selectCurrency} />
            <Button onClick={onAddCurrency}>Submit</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home