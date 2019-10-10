import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import Header from '../Header';
import { Card, Select, Button, Spin, Icon } from 'antd';
const { Option } = Select;

const CurrencyItem = ({name, rates, value}) => {
  const count = rates[name] * (value || 1);
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
          <Icon type="delete" />
        </a>
      } 
      style={{ width: '100%' }}
      >
      <p>{`${name} - Indonesian Rupiah`}</p>
      <p>{`1 USD = ${name} ${parseRate}`}</p>
    </Card>
  )
}

const Home = () =>  {
  const [value, setValue] = useState(10.00);
  const [rates, setRates] = useState([]);
  const [query, setQuery] = useState(['IDR','GBP']);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, addCurrency] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${query.join(',')}`);
      setRates(result.data.rates);
      setIsLoading(false);
    };
    fetchData();
  }, [query]);

  return (
    <div className="home">
      <Header value={value} onChange={value => setValue(value)} />
      <div className="home-content"> 
        {!isLoading ? (
          <div className="content-item">
            {Object.keys(rates).map((item, index)  => (<CurrencyItem name={item} key={index} rates={rates} value={value} />))}
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
            <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            // onChange={onChange}
            // onFocus={onFocus}
            // onBlur={onBlur}
            // onSearch={onSearch}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            <Button onClick={this.onSubmit}>Submit</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home