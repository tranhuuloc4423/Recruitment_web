const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

tagSchema.pre('save', async function (next) {
  const tag = this
  const Tag = mongoose.model('Tag')
  if (!tag.id) {
    const lastTag = await Tag.findOne({}, {}, { sort: { id: -1 } })
    tag.id = lastTag ? lastTag.id + 1 : 1
  }
  next()
})

const Tag = mongoose.model('Tag', tagSchema)
module.exports = Tag
