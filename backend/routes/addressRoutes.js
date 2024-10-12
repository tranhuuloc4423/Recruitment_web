const express = require('express')
const router = express.Router()
const {
  getProvinceByCode,
  getDistrictsByProvinceCode,
  getWardsByDistrictCode,
  getAllData,
  deleteProvinceByCode
} = require('../controllers/addressControllers')

router.get('/:code', getProvinceByCode)
router.get('/:provinceCode/districts', getDistrictsByProvinceCode)
router.get('/:provinceCode/:districtCode/wards', getWardsByDistrictCode)
router.get('/provinces', getAllData)
router.delete('/:code', deleteProvinceByCode)

module.exports = router
