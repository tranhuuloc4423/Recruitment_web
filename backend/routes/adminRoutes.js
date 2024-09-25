const adminControllers = require('../controllers/adminControllers')

const router = require('express').Router()

router.put('/:id/basic_info', adminControllers.updateBasicInfo)
router.put('/:id/other_info', adminControllers.updateOtherInfo)
router.get('/:id/', adminControllers.getDataById)
router.get('/', adminControllers.getAllData)

module.exports = router
