import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../commons/ListItem';

/**
 * Currency list component
 * 
 */

const ActionButton = ({ rates, query, value, rateList, onRemove }) => {
  return (
    <div className="content-items">
      {Object.keys(rates).length === query.length 
        && query.map(item => {
          return <ListItem name={item} key={item} rates={rates} value={value} onRemove={onRemove} rateList={rateList} />
        })
      }
    </div>
  );
};

ActionButton.propTypes = {
  rates: PropTypes.object,
  query: PropTypes.array,
  value: PropTypes.string,
  rateList: PropTypes.object,
  onRemove: PropTypes.func,
};

export default ActionButton;
