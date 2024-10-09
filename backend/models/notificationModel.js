const mongoose = require('mongoose')

const notiSchema = new mongoose.Schema(
  {
    sender: mongoose.Schema.Types.ObjectId,
    recipient: mongoose.Schema.Types.ObjectId,
    time: {
      type: String
    },
    title: {
      type: String
    },
    desc: {
      type: String
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', notiSchema)
module.exports = Notification
