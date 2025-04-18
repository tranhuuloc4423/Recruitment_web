const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
  },
  { timestamps: true }
)

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation
