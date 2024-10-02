const recruiterControllers = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.put('/:recruiterId/basic_info', recruiterControllers.updateBasicInfo)
router.put('/:recruiterId/other_info', recruiterControllers.updateOtherInfo)
router.get('/:recruiterId/', recruiterControllers.getDataById)
router.get('/', recruiterControllers.getAllData)

module.exports = router
