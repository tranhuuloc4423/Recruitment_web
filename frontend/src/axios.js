import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.SERVER_URL
  baseURL: 'http://localhost:8080'
})

export default instance
