const express = require('express')
const upload = require('../app')
const {
  uploadImage,
  getAllImages,
  getImageById,
  deleteImageById,
  updateImageById
} = require('../controllers/imageController')

const router = express.Router()

router.post('/upload', upload.single('image'), uploadImage)
router.get('/images', getAllImages)
router.get('/images/:id', getImageById)
router.delete('/images/:id', deleteImageById)
router.put('/images/:id', updateImageById)

module.exports = router
