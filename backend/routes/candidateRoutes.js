const candidateControllers = require('../controllers/candidateControllers')

const router = require('express').Router()

router.put('/:id/basic_info', candidateControllers.updateBasicInfo)
router.put('/:id/other_info', candidateControllers.updateOtherInfo)
router.put('/:id/target', candidateControllers.updateTarget)
router.get('/:id/', candidateControllers.getDataById)
router.get('/', candidateControllers.getAllData)

module.exports = router
