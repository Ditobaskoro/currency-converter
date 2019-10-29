import { useState, useCallback } from 'react'
import { message } from 'antd'

export default function useCurrency() {
  const [initQuery] = useState(() => {
    let initQuery = []
    if (localStorage.getItem('query')) {
      initQuery = JSON.parse(localStorage.getItem('query'))
    } else {
      initQuery = ['IDR', 'GBP']
      localStorage.setItem('query', JSON.stringify(initQuery))
    }
    return initQuery
  })

  const [value, setValue] = useState('10')
  const [query, setQuery] = useState(initQuery)
  const [isAdding, addCurrency] = useState(false)
  const [newCurrency, selectCurrency] = useState('')
  const [base, selectBase] = useState('USD')

  const handleAddCurrency = useCallback(() => {
    if (query.indexOf(newCurrency) === -1) {
      setQuery([...query, newCurrency])
      localStorage.setItem('query', JSON.stringify([...query, newCurrency]))
      message.success('Currency added')
    } else {
      message.info('Currency already exist')
    }
    addCurrency(!isAdding)
  }, [query, newCurrency, isAdding])

  const handleRemoveCurrency = (e, currency) => {
    e.preventDefault()
    const newQuery = query.filter(item => item !== currency)
    localStorage.setItem('query', JSON.stringify(newQuery))
    setQuery(newQuery)
    message.success('Currency removed')
  }

  return [handleAddCurrency, handleRemoveCurrency, addCurrency, value, setValue, selectCurrency, isAdding, query, base, selectBase]
}
