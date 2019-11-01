import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'antd'
import CurrencyOption from './Select'

/**
 * Group button component
 *
 */

const GroupButton = ({ list, onListChange, onAdd, onClose }) => {
  return (
    <div className="group-button">
      <Icon type="close-circle" className="group-icon" onClick={onClose} />
      <span className="ant-input-group ant-input-group-compact">
        <CurrencyOption list={list} onChange={onListChange} container="selection-area" position="top" />
        <Button type="primary" onClick={onAdd}>
          Submit
        </Button>
      </span>
    </div>
  )
}

GroupButton.propTypes = {
  list: PropTypes.object,
  onListChange: PropTypes.func,
  onAdd: PropTypes.func,
  onClose: PropTypes.func
}

export default GroupButton
