import axios from 'axios'
const http = axios.create({
  timeout: 5000,
  baseURL: process.env.http_base_url,
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  withCredentials: true
})

http.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  return Promise.reject(error)
})

http.interceptors.response.use(response => {
  if (response.status !== 200) {
    return Promise.reject(new Error('request failed'))
  }
  return response
}, error => {
  return Promise.reject(error)
})
export default {
  _get: (url, succ, fail, config = {}) => {
    http.get(url, config)
      .then(function (response) {
        typeof succ === 'function' && succ(response)
      })
      .catch(function (error) {
        console.error(url + ' failed, error messsage: ' + error)
        typeof fail === 'function' && fail()
      })
  },
  _delete: (url, succ, fail, config = {}) => {
    http.delete(url, config)
      .then(function (response) {
        typeof succ === 'function' && succ(response)
      })
      .catch(function (error) {
        console.error(url + ' failed, error messsage: ' + error)
        typeof fail === 'function' && fail()
      })
  },
  _post: (url, param, succ, fail, config = {}) => {
    http.post(url, param, config)
      .then(function (response) {
        typeof succ === 'function' && succ(response)
      })
      .catch(function (error) {
        console.error(url + ' failed, error messsage: ' + error)
        typeof fail === 'function' && fail()
      })
  },
  _put: (url, param, succ, fail, config = {}) => {
    http.put(url, param, config)
      .then(function (response) {
        typeof succ === 'function' && succ(response)
      })
      .catch(function (error) {
        console.error(url + ' failed, error messsage: ' + error)
        typeof fail === 'function' && fail()
      })
  }
}
