const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    basic_info: {
      image: {
        public_id: { type: String },
        url: { type: String }
      },
      name: { type: String },
      dob: { type: String },
      phone: { type: String },
      email: { type: String },
      address: {
        province: { name: { type: String }, code: { type: String } },
        district: { name: { type: String }, code: { type: String } }
      },
      gender: {
        name: { type: String },
        value: { type: String }
      }
    },
    other_info: {
      desc: { type: String },
      education: { type: String },
      exps: { type: String },
      skills: [
        {
          name: String,
          value: String
        }
      ],
      projects: { type: String },
      certificates: { type: String }
    },
    target: {
      skills: [{ value: String, name: String }],
      target_money: {
        min_money: { type: Number },
        max_money: { type: Number }
      },
      types: [{ value: String, name: String }],
      address: { province: { name: { type: String }, code: { type: String } } },
      wforms: [{ value: String, name: String }]
    },
    jobs: {
      saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      recent: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      applied: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      approved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
      followed: [{ type: mongoose.Schema.Types.ObjectId }]
    },
    notifications: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }
    ],
    profileStatus: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
)

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate
