const mongoose = require('mongoose')
const Conversation = require('../models/conversationModel')

const conversationControllers = {
  createConversation: async (req, res) => {
    try {
      let { members } = req.body
      if (!Array.isArray(members) || members.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'members phải là mảng ít nhất 2 phần tử.'
        })
      }
      members = members.map((id) => new mongoose.Types.ObjectId(id))

      const existing = await Conversation.findOne({
        members: { $all: members, $size: members.length }
      })
      if (existing) {
        return res.json({ success: true, data: existing })
      }

      const conversation = await Conversation.create({ members })
      return res.status(201).json({ success: true, data: conversation })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Lỗi khi tạo conversation.' })
    }
  },

  getConversationsByUserId: async (req, res) => {
    try {
      const { userId } = req.params
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res
          .status(400)
          .json({ success: false, error: 'userId không hợp lệ.' })
      }
      const conversations = await Conversation.find({ members: userId })
        .populate('members', 'name email')
        .populate({
          path: 'messages',
          options: { sort: { createdAt: -1 }, limit: 20 }, // Lấy 20 tin mới nhất
          populate: { path: 'sender', select: 'name' }
        })
      return res.json({ success: true, data: conversations })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Lỗi khi lấy danh sách conversation.' })
    }
  },

  getConversationById: async (req, res) => {
    try {
      const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(400)
          .json({ success: false, error: 'Conversation ID không hợp lệ.' })
      }
      const conversation = await Conversation.findById(id)
        .populate('members', 'name email')
        .populate({
          path: 'messages',
          options: { sort: { createdAt: 1 } },
          populate: { path: 'sender', select: 'name' }
        })
      if (!conversation) {
        return res
          .status(404)
          .json({ success: false, error: 'Conversation không tồn tại.' })
      }
      return res.json({ success: true, data: conversation })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ success: false, error: 'Lỗi khi lấy conversation.' })
    }
  }
}

module.exports = conversationControllers
