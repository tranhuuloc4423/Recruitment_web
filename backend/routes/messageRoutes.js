const {
  createMessage,
  getMessagesByConversation
} = require('../controllers/messageControllers')

const router = require('express').Router()

router.post('/create', createMessage)
router.get('/:conversationId', getMessagesByConversation)

module.exports = router
