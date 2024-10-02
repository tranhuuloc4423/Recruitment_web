const adminControllers = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/:adminId/basic_info', adminControllers.updateBasicInfo)
router.put('/:adminId/other_info', adminControllers.updateOtherInfo)
router.get('/:adminId/', adminControllers.getDataById)
router.get('/', adminControllers.getAllData)

module.exports = router
