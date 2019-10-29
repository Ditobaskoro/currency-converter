import { FETCH_CURRENCY } from '../constants/currencyConstant'
import api from '../helpers/api'

export const getCurrency = (base, query) => async dispatch => {
  try {
    const result = await api.currency.list(base, query)
    dispatch({ type: FETCH_CURRENCY, payload: result.data })
  } catch (err) {
    console.log('Cannot connect to API', err)
  }
}
