import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getCurrency } from '../actions/currencyAction'

export default function useFetch(base, query, dispatch) {
  const [isLoading, setIsLoading] = useState(false)
  const currency = useSelector(state => state.currency)

  useEffect(() => {
    let mounted = true
    setIsLoading(true)
    dispatch(getCurrency(base, query))
    if (mounted) {
      setIsLoading(false)
    }

    const cleanup = () => {
      mounted = false
    }

    return cleanup
  }, [query, base, dispatch])
  return [currency.rates, isLoading]
}
