import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CurrencyOption = ({ list, onChange }) => {
  return (
    <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Select a currency"
    optionFilterProp="children"
    onChange={value => onChange(value)}
    filterOption={(input, option) =>
      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    >
      {Object.keys(list).map(item => (<Option value={item} key={item}>{item}</Option>))}
    </Select>
  )
}

export default CurrencyOption;
