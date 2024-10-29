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
router.get('/districts/:provinceCode', getDistrictsByProvinceCode)
router.get('/wards/:provinceCode/:districtCode', getWardsByDistrictCode)
router.get('/', getAllProvinces)

module.exports = router
