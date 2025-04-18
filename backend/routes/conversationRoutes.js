const {
  createConversation,
  getConversationsByUserId,
  getConversationById
} = require('../controllers/conversationControllers')

const router = require('express').Router()

router.post('/create', createConversation)
router.get('/user/:userId', getConversationsByUserId)
router.get('/:id', getConversationById)

module.exports = router
