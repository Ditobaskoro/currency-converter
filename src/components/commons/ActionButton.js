import React from 'react';
import PropTypes from 'prop-types';

/**
 * Action button component
 * 
 */

const ActionButton = ({ onClick, title }) => {
  return (
    <div onClick={onClick} className="action-button">
      {title}
    </div>
  );
};

ActionButton.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default ActionButton;
