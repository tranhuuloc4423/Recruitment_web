const mongoose = require('mongoose')
const Message = require('../models/messageModel')
const Conversation = require('../models/conversationModel')

const messageControllers = {
  createMessage: async (req, res) => {
    try {
      let { sender, content, conversationId } = req.body
      if (
        !mongoose.Types.ObjectId.isValid(sender) ||
        !mongoose.Types.ObjectId.isValid(conversationId) ||
        typeof content !== 'string'
      ) {
        return res
          .status(400)
          .json({ success: false, error: 'Dữ liệu gửi không hợp lệ.' })
      }

      const message = await Message.create({ sender, content, conversationId })
      await Conversation.findByIdAndUpdate(
        conversationId,
        { $push: { messages: message._id } },
        { new: true }
      )
      return res.status(201).json({ success: true, data: message })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Lỗi khi tạo tin nhắn.' })
    }
  },

  getMessagesByConversation: async (req, res) => {
    try {
      const { conversationId } = req.params
      if (!mongoose.Types.ObjectId.isValid(conversationId)) {
        return res
          .status(400)
          .json({ success: false, error: 'Conversation ID không hợp lệ.' })
      }
      const messages = await Message.find({ conversationId })
        .sort({ createdAt: 1 })
        .populate('sender', 'name')
      return res.json({ success: true, data: messages })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Lỗi khi lấy tin nhắn.' })
    }
  }
}

module.exports = messageControllers
