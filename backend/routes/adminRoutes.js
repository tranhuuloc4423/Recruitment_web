const adminControllers = require('../controllers/adminControllers')

const router = require('express').Router()

router.get('/:id/', adminControllers.getDataById)
router.get('/', adminControllers.getAllData)

module.exports = router
