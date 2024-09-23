const recruiterControllers = require('../controllers/recruiterControllers')

const router = require('express').Router()

router.get('/:id/', recruiterControllers.getDataById)
router.get('/', recruiterControllers.getAllData)

module.exports = router
