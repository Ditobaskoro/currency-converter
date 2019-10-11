import React from 'react';
import { Input } from 'antd';

const InputNumber = (props) => {
  const onInputChange = (e) => {
    // allow only number, and limit length
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value) && value.length <= props.limit) || value === '' || value === '-') {
      props.onChange(value);
    }
  };

  return (
    <Input
      {...props}
      onChange={onInputChange}
      size="large"
      autoFocus={true}
      placeholder="Input a number"
      prefix="$"
      style={{ width: '200px', float: 'right', marginRight: '10px' }}
    />
  );
}

export default InputNumber;
