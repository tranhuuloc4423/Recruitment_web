const express = require('express')
const router = express.Router()
const {
  getProvinceByCode,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
  deleteProvinceByCode
} = require('../controllers/addressControllers')

router.get('/province/:code', getProvinceByCode)
router.get('/province/:provinceCode/districts', getDistrictsByProvinceCode)
router.get(
  '/province/:provinceCode/district/:districtCode/wards',
  getWardsByDistrictCode
)
router.delete('/province/:code', deleteProvinceByCode)

module.exports = router
