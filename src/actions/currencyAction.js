import { FETCH_CURRENCY } from '../constants/currencyConstant'
import API from '../helpers/api'

export const getInitialCurrency = (base, query) => async dispatch => {
  try {
    const result = await API.currency.list(base, query)
    dispatch({ type: FETCH_CURRENCY, payload: result.data.rates })
  } catch (err) {
    console.log(err)
  }
}
