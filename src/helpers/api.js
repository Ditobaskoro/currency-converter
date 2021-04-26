import axios from 'axios'

/**
 * List of API request method
 *
 */

const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

const request = async (method, url, data) => {
  const body = JSON.stringify(data)
  const headers = {
    'Content-Type': 'application/json'
  }

  // If require token
  // const auth = localStorage.getItem('auth')
  // if (auth) {
  //   headers.Authorization = auth
  // }

  return axios({
    method: method,
    url: `${API_URL}/${url}`,
    headers: headers,
    data: body
  })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err.message)
    })
}

const get = (url, data) => request('GET', url, data)

const api = {
  currency: {
    list: (base, query) => get(`latest?access_key=${API_KEY}&base=${base}&symbols=${query.join(',')}`)
  }
}

export default api
