const {
  getAllUsers,
  updatePassword,
  deleteUser,
  signUp,
  signIn
} = require('../controllers/userControllers')

const router = require('express').Router()

router.get('/', getAllUsers)
router.put('/password/:id', updatePassword)
router.delete('/:id', deleteUser)
router.post('/signup', signUp)
router.post('/signin', signIn)

module.exports = router
