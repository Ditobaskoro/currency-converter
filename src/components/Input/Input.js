import React from 'react';
import { Input } from 'antd';

const formatNumber = value => {
  value += '';
  const list = value.split('.');
  const prefix = list[0].charAt(0) === '-' ? '-' : '';
  let num = prefix ? list[0].slice(1) : list[0];
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}


const InputNumber = props => {

  const onInputChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  return (
    <Input
      {...props}
      onChange={onInputChange}
      autoFocus={true}
      placeholder="Input a number"
      prefix="$"
      style={{ width: '200px', float: 'right', marginRight: '10px' }}
    />
  );
}

export default InputNumber;
