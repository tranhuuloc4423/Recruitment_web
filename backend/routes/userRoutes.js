const userControllers = require('../controllers/userControllers')

const router = require('express').Router()

router.get('/', userControllers.getAllUsers)
router.put('/password/:id', userControllers.updatePassword)
router.delete('/:id', userControllers.deleteUser)
router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)

module.exports = router
