const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const appRoute = require('./routes/index')

app.use(express.json())
app.use('/', appRoute)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err))

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})