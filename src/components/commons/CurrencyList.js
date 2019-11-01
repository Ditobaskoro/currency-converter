import React from 'react'
import PropTypes from 'prop-types'
import ListItem from '../commons/ListItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

/**
 * Currency list component
 * With draggable function
 */

const CurrencyList = ({ rates, query, value, rateList, onRemove, onReorder }) => {
  const reorder = (startIndex, endIndex) => {
    const newQuery = [...query]
    const [removed] = newQuery.splice(startIndex, 1)
    newQuery.splice(endIndex, 0, removed)

    onReorder(newQuery)
  }

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    reorder(result.source.index, result.destination.index)
  }

  return (
    <div className="content-items">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Object.keys(rates).length === query.length &&
                query.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {provided => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ListItem name={item} key={item} rates={rates} value={value} onRemove={onRemove} rateList={rateList} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

CurrencyList.propTypes = {
  rates: PropTypes.object,
  query: PropTypes.array,
  value: PropTypes.string,
  rateList: PropTypes.object,
  onRemove: PropTypes.func,
  onReorder: PropTypes.func
}

export default CurrencyList
