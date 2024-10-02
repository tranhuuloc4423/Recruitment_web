const mongoose = require('mongoose')
const { Schema } = mongoose // Thêm { Schema } để lấy đối tượng Schema

const postSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    title: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    authorType: {
      type: String,
      enum: ['recruiter', 'admin'],
      required: true
    },
    company_info: {
      type: [Schema.Types.Mixed]
    },
    salary: {
      type: Number
    },
    quantity: {
      type: Number
    },
    date_upload: {
      type: String
    },
    date_expiration: {
      type: String
    },
    skills: [
      {
        type: String
      }
    ],
    desc: {
      type: String
    },
    request: {
      type: String
    },
    status: {
      type: String,
      enum: ['normal', 'hot', 'superhot']
    },
    views: {
      type: Number
    },
    applied: [
      {
        candidate_info: Schema.Types.Mixed
      }
    ]
  },
  { timestamps: true }
)

// Middleware pre-save để tự động tăng id
postSchema.pre('save', async function (next) {
  if (!this.id) {
    const lastPost = await mongoose
      .model('Post')
      .findOne({}, {}, { sort: { id: -1 } })
    this.id = lastPost ? lastPost.id + 1 : 1
  }
  next()
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
