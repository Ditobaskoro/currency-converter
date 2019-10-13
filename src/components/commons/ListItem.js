import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon } from 'antd';

/**
 * List item component for listing target currency
 *
 */

const ListItem = ({ name, rates, value, onRemove, rateList }) => {
  const count = rates[name] * (parseFloat(value) || 0); // count the value based on currency
  // parse the value using decimal separator
  const parseCount = count
    .toFixed(3)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const parseRate = rates[name]
    .toFixed(3)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <Card
      title={
        <div className="content-container">
          <div className="content-title">{name}</div>
          <div className="content-value">{parseCount}</div>
        </div>
      }
      extra={
        <a href="/" onClick={e => onRemove(e, name)}>
          <Icon type="close-circle" />
        </a>
      }
      style={{ width: '100%' }}>
      <p>{`${name} - ${rateList[name]}`}</p>
      <p>{`1 USD = ${name} ${parseRate}`}</p>
    </Card>
  )
};

ListItem.propTypes = {
  name: PropTypes.string,
  rates: PropTypes.object,
  value: PropTypes.string,
  onRemove: PropTypes.func,
  rateList: PropTypes.object,
};

export default ListItem;