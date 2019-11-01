import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

/**
 * Select component for selecting new target currency
 *
 */

const Selection = ({ list, onChange, defaultValue, container, size, position }) => {
  const dropdown = {
    top: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX: 0,
        adjustY: 1
      }
    },
    bottom: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: {
        adjustX: 0,
        adjustY: 1
      }
    }
  }

  return (
    <Select
      showSearch
      style={{ width: 250 }}
      size={size}
      defaultValue={defaultValue}
      placeholder="Select a currency"
      optionFilterProp="children"
      onChange={value => onChange(value)}
      getPopupContainer={() => document.getElementById(container)}
      dropdownAlign={dropdown[position]}
      filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
      {Object.keys(list).map(item => (
        <Option value={item} key={item}>
          {item} - {list[item]}
        </Option>
      ))}
    </Select>
  )
}

Selection.propTypes = {
  list: PropTypes.object,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  container: PropTypes.string,
  size: PropTypes.string,
  position: PropTypes.string
}

export default Selection
