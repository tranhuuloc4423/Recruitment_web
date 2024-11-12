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
      skills: [{ type: String }],
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

// Middleware để tính toán và cập nhật profileStatus trước khi lưu
candidateSchema.pre('save', function (next) {
  const basicInfoFields = [
    this.basic_info.image?.public_id,
    this.basic_info.image?.url,
    this.basic_info.name,
    this.basic_info.dob,
    this.basic_info.phone,
    this.basic_info.email,
    this.basic_info.address?.province,
    this.basic_info.address?.district
  ]

  const otherInfoFields = [
    this.other_info.desc,
    this.other_info.education,
    this.other_info.exps,
    this.other_info.projects,
    this.other_info.certificates,
    this.other_info.skills?.length > 0
  ]

  // Tính tỷ lệ hoàn thành cho basic_info và other_info
  const basicInfoCompleted =
    basicInfoFields.filter(Boolean).length / basicInfoFields.length
  const otherInfoCompleted =
    otherInfoFields.filter(Boolean).length / otherInfoFields.length

  // Tính phần trăm tổng hoàn thành và cập nhật profileStatus
  this.profileStatus = Math.round(
    basicInfoCompleted * 50 + otherInfoCompleted * 50
  )
  next()
})

const Candidate = mongoose.model('Candidate', candidateSchema)
module.exports = Candidate
