import { FETCH_CURRENCY } from '../constants/currencyConstant'
import { combineReducers } from 'redux'

const rates = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        ...action.payload.rates
      }

    default:
      return state
  }
}

const base = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        name: action.payload.base,
        date: action.payload.date
      }

    default:
      return state
  }
}

const currency = combineReducers({
  rates,
  base
})

export default currency
