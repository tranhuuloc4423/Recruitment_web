const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image
