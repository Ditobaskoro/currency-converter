import { FETCH_CURRENCY } from '../constants/currencyConstant'

const initialState = {}

export default function currency(state = initialState, action) {
  switch (action.type) {
    case FETCH_CURRENCY:
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
