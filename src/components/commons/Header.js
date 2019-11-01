import React from 'react'
import PropTypes from 'prop-types'
import Input from './InputNumber.js'
import CurrencyOption from './Select'
import * as Flags from '../../assets/flags'

/**
 * Header component for stating base currency
 *
 */

const Header = ({ value, onChange, limit, list, onListChange, base }) => {
  return (
    <div className="header" id="header">
      <div className="header-title">Currency Converter</div>
      <div className="header-select">
        <img className="content-flag" src={Flags[base]} alt="flag" />
        <CurrencyOption list={list} onChange={onListChange} defaultValue={base} container="header" size="large" position="bottom" />
        <Input value={value} onChange={onChange} limit={limit} />
      </div>
    </div>
  )
}

Header.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  limit: PropTypes.number,
  list: PropTypes.object,
  onListChange: PropTypes.func,
  base: PropTypes.string
}

export default Header
