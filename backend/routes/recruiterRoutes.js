const recruiterControllers = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.put('/:id/basic_info', recruiterControllers.updateBasicInfo)
router.put('/:id/other_info', recruiterControllers.updateOtherInfo)
router.get('/:id/', recruiterControllers.getDataById)
router.get('/', recruiterControllers.getAllData)

module.exports = router
