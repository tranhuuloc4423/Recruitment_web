const express = require('express')
const router = express.Router()
const addressControllers = require('../controllers/addressControllers')

router.get('/fetch-and-save', addressControllers.fetchAndSaveProvinces)
router.get('/provinces', addressControllers.getAllProvinces)
router.get('/provinces/:id', addressControllers.getProvinceById)
router.get(
  '/provinces/:provinceId/districts',
  addressControllers.getDistrictsByProvinceId
)
router.get(
  '/provinces/:provinceId/districts/:districtId/wards',
  addressControllers.getWardsByDistrictId
)
router.delete('/provinces/:id', addressControllers.deleteProvinceById)

module.exports = router
