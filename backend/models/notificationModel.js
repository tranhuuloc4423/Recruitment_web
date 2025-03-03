const mongoose = require('mongoose')

const notiSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    desc: { type: String, required: true }
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notiSchema)
module.exports = Notification
