import React from 'react'
import PropTypes from 'prop-types'

/**
 * Empty container
 *
 */

const EmptyContainer = ({ title }) => {
  return <div className="content-empty">{title}</div>
}

EmptyContainer.propTypes = {
  title: PropTypes.string
}

export default EmptyContainer
