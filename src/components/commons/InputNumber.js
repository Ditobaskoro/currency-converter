import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd'

/**
 * Input component for input currency value
 *
 */

const InputNumber = ({ value, onChange, limit }) => {
  const onInputChange = e => {
    // limit length of value
    const { value } = e.target
    if (!isNaN(value) && value.length <= limit) {
      onChange(value)
    }
  }

  return <Input type="number" value={value} onChange={onInputChange} size="large" autoFocus={true} placeholder="Input a number" prefix="$" className="input-number" />
}

InputNumber.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  limit: PropTypes.number
}

export default InputNumber
