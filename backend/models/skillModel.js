const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  }
})

const Skill = mongoose.model('Skill', skillSchema)
module.exports = Skill
