import axios from 'axios'
import { tokenKey } from '../constant/localStorage'

const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

http.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(tokenKey)}`
  return config
})

export {
  http
}
