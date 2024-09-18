const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  const user = this
  const User = mongoose.model('User')
  if (!user.id) {
    const lastUser = await User.findOne({}, {}, { sort: { id: -1 } })
    user.id = lastUser ? lastUser.id + 1 : 1
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
