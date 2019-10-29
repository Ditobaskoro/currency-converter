import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'

const { Option } = Select

/**
 * Select component for selecting new target currency
 *
 */

const Selection = ({ list, onChange }) => {
  return (
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a currency"
      optionFilterProp="children"
      onChange={value => onChange(value)}
      getPopupContainer={() => document.getElementById('selection-area')}
      dropdownAlign={{
        points: ['bl', 'tl'],
        offset: [0, -4],
        overflow: {
          adjustX: 0,
          adjustY: 1
        } // Make it open to the top
      }}
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
  onChange: PropTypes.func
}

export default Selection
