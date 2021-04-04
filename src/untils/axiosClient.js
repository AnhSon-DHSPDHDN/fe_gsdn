import axios from 'axios'
import queryString from 'query-string'
import * as Types from '../configs/config';

const axiosClient = axios.create({
  baseURL: Types.BASE_BE,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: param => queryString.stringify(param)
})

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access-token')
  config.headers['access-token'] = `${token}` || ''
  return config
})

axiosClient.interceptors.response.use((response) => {
  return response
}, function (error) {
  if (error.response.status === 401) {
    localStorage.clear('token')
    document.location.href = '/'
  }
  return Promise.reject(error.response?.data?.message)
})

export default axiosClient