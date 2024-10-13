const express = require('express')
const {
  getAllImages,
  getImageById,
  deleteImageById,
  updateImageById
} = require('../controllers/imageControllers')

const router = express.Router()

router.get('/images', getAllImages)
router.get('/images/:id', getImageById)
router.delete('/images/:id', deleteImageById)
router.put('/images/:id', updateImageById)

module.exports = router
