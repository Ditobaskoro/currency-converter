import { useState, useCallback } from 'react'
import { message } from 'antd'

const useCurrency = () => {
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

  const [initBase] = useState(() => {
    let initBase = 'USD'
    if (localStorage.getItem('base')) {
      initBase = localStorage.getItem('base')
    } else {
      localStorage.setItem('base', initBase)
    }
    return initBase
  })

  const [value, setValue] = useState('100')
  const [query, setQuery] = useState(initQuery)
  const [isAdding, addCurrency] = useState(false)
  const [newCurrency, selectCurrency] = useState('')
  const [base, selectBase] = useState(initBase)

  const handleAddCurrency = useCallback(() => {
    if (newCurrency === '') {
      message.info('Please select currency before adding')
    } else if (query.indexOf(newCurrency) === -1) {
      setQuery([...query, newCurrency])
      localStorage.setItem('query', JSON.stringify([...query, newCurrency]))
      message.success('Currency added')
    } else {
      message.info('Currency already exist')
    }
    addCurrency(!isAdding)
  }, [query, newCurrency, isAdding])

  const handleReorder = newQuery => {
    setQuery(newQuery)
    localStorage.setItem('query', JSON.stringify([...newQuery]))
  }
  const handleRemoveCurrency = (e, currency) => {
    e.preventDefault()
    const newQuery = query.filter(item => item !== currency)
    localStorage.setItem('query', JSON.stringify(newQuery))
    setQuery(newQuery)
    message.success('Currency removed')
  }

  const handleSelectBase = base => {
    selectBase(base)
    const newQuery = query.filter(item => item !== base)
    localStorage.setItem('base', base)
    setQuery(newQuery)
  }

  return [handleAddCurrency, handleRemoveCurrency, addCurrency, value, setValue, selectCurrency, isAdding, query, handleReorder, base, handleSelectBase]
}

export default useCurrency
