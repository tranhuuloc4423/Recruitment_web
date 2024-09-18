const UserController = require('../controllers/UserController')
const router = require('express').Router()

router.get('/', UserController.getAllUsers)
router.put('/:id', UserController.updateUser)
router.delete('/:id', UserController.deleteUser)

module.exports = router
