import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const InputNumber = ({ value, onChange, limit }) => {
  const onInputChange = e => {
    // allow only number, and limit length
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if ((!isNaN(value) && reg.test(value) && value.length <= limit) || value === '' || value === '-') {
      onChange(parseInt(value) || null);
    }
  };

  return (
    <Input
      value={value}
      onChange={onInputChange}
      size="large"
      autoFocus={true}
      placeholder="Input a number"
      prefix="$"
      style={{ width: '200px', float: 'right', marginRight: '10px' }}
    />
  );
};

InputNumber.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
  limit: PropTypes.number,
};

export default InputNumber;
