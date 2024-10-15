import axios from 'axios'

const instance = axios.create({
  // baseURL: process.env.SERVER_URL
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  maxContentLength: Infinity,
  maxBodyLength: Infinity
})

export default instance
