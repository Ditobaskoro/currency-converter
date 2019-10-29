import React from 'react'
import './home.css'
import { useDispatch } from 'react-redux'
import { Spin } from 'antd'
import Header from '../commons/Header'
import rateList from './list.json'
import ActionButton from '../commons/ActionButton'
import EmptyContainer from '../commons/EmptyContainer'
import CurrencyList from '../commons/CurrencyList'
import useFetch from '../../hooks/useFetch'
import useCurrency from '../../hooks/useCurrency'
import GroupButton from '../commons/GroupButton'

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
          <GroupButton list={rateList} onListChange={selectCurrency} onClose={() => addCurrency(!isAdding)} onAdd={handleAddCurrency} />
        )}
      </div>
    </div>
  )
}

export default Home
