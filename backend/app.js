const express = require('express')
const cors = require('cors')
const appRoute = require('./routes/index')

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/', appRoute)

module.exports = app
