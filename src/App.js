import React from 'react'
import './App.css'
import Home from './components/Home'
import store from './store'
import { Provider } from 'react-redux'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

const queryCache = new QueryCache()

const App = () => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Provider store={store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    </ReactQueryCacheProvider>
  )
}

export default App
