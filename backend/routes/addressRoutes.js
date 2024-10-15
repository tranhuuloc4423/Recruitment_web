const express = require('express')
const router = express.Router()
const {
  fetchAndSaveProvinces,
  getProvinceByCode,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
  getAllProvinces
} = require('../controllers/addressControllers')

router.get('/fetch-and-save', fetchAndSaveProvinces)
router.get('/:code', getProvinceByCode)
router.get('/:provinceCode/districts', getDistrictsByProvinceCode)
router.get('/:provinceCode/:districtCode/wards', getWardsByDistrictCode)
router.get('/', getAllProvinces)

module.exports = router
