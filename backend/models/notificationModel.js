const mongoose = require('mongoose')

const notiSchema = new mongoose.Schema(
  {
    sender: mongoose.Schema.Types.ObjectId,
    recipient: mongoose.Schema.Types.ObjectId,
    time: {
      type: String,
      default: '7 days'
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      index: { expires: 0 }
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notiSchema)
module.exports = Notification
