/**
 * List of API request method
 *
 */

const API_URL = process.env.REACT_APP_API_URL

const request = async (method, url, data) => {
  const body = JSON.stringify(data)
  const headers = {
    'Content-Type': 'application/json'
  }

  const auth = localStorage.getItem('auth')

  if (auth) {
    headers.Authorization = auth
  }

  return fetch(`${API_URL}/${url}`, { method, headers, body })
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
    list: (base, query) => get(`latest?base=${base}&symbols=${query.join(',')}`)
  }
}

export default api
