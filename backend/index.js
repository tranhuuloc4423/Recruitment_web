const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI
const appRoute = require('./routes/index')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png',
    public_id: (req, file) => file.originalname.split('.')[0]
  }
})

const upload = multer({ storage: storage })

app.use(
  cors({
    origin: 'http://localhost:3000'
  })
)

app.use(express.json())
app.use('/', appRoute)

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err))

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`)
})

module.exports = upload
