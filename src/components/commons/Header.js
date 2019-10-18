import React from 'react';
import PropTypes from 'prop-types';
import Input from './InputNumber.js';

/**
 * Header component for stating base currency
 * 
 */

const Header = ({ value, onChange, limit }) => {
  return (
    <div className="header">
      <div className="header-sub">USD - United States Dollars</div>
      <div className="header-title">
        USD
        <Input value={value} onChange={onChange} limit={limit} />
      </div>
    </div>
  );
};

Header.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  limit: PropTypes.number,
};

export default Header;
