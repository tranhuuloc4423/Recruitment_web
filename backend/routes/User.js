const userControllers = require('../controllers/userControllers')

const router = require('express').Router()

router.get('/', userControllers.getAllUsers)
router.put('/:id', userControllers.updateUserPassword)
router.delete('/:id', userControllers.deleteUser)
router.post('/signup', userControllers.signUp)
router.post('/signin', userControllers.signIn)
router.post('/logout', userControllers.logOut)

module.exports = router
