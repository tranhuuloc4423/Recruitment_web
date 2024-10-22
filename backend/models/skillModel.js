const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
})

const Skill = mongoose.model('Skill', skillSchema)
module.exports = Skill
