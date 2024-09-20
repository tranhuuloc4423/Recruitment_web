const mongoose = require('mongoose')

const notiSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    sender: mongoose.Schema.Types.Mixed,
    recipient: mongoose.Schema.Types.Mixed,
    time: {
      type: Date
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

notiSchema.pre('save', async function (next) {
  const notification = this
  const Notification = mongoose.model('Tag')
  if (!notification.id) {
    const lastNoti = await Notification.findOne({}, {}, { sort: { id: -1 } })
    notification.id = lastNoti ? lastNoti.id + 1 : 1
  }
  next()
})

const Notification = mongoose.model('Notification', notiSchema)
module.exports = Notification
