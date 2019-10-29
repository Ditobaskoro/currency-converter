import React from 'react'
import './home.css'
import { useDispatch } from 'react-redux'
import { Button, Spin } from 'antd'
import Header from '../commons/Header'
import rateList from './list.json'
import CurrencyOption from '../commons/Select'
import ActionButton from '../commons/ActionButton'
import EmptyContainer from '../commons/EmptyContainer'
import CurrencyList from '../commons/CurrencyList'
import useFetch from '../../hooks/useFetch'
import useCurrency from '../../hooks/useCurrency'

/**
 * Home Interface Component
 *
 */

const Home = () => {
  const [handleAddCurrency, handleRemoveCurrency, addCurrency, value, setValue, selectCurrency, isAdding, query, base, selectBase] = useCurrency()
  const [rates, isLoading] = useFetch(base, query, useDispatch())

  return (
    <div className="home">
      <Header value={value} onChange={value => setValue(value)} limit={15} />
      <div className="home-content">
        {query.length === 0 ? (
          <EmptyContainer title="Add some currency" />
        ) : !isLoading ? (
          <CurrencyList rates={rates} query={query} value={value} rateList={rateList} onRemove={handleRemoveCurrency} />
        ) : (
          <Spin />
        )}
      </div>
      <div className="home-action">
        {!isAdding ? (
          <ActionButton onClick={() => addCurrency(!isAdding)} title="Add More Currencies" />
        ) : (
          <span className="ant-input-group ant-input-group-compact">
            <CurrencyOption list={rateList} onChange={selectCurrency} />
            <Button type="primary" onClick={handleAddCurrency}>
              Submit
            </Button>
          </span>
        )}
      </div>
    </div>
  )
}

export default Home
