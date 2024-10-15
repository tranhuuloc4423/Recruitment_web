const mongoose = require('mongoose')

const wardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true }
})

const districtSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  wards: [wardSchema]
})

const provinceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  districts: [districtSchema]
})

const Address = mongoose.model('Address', provinceSchema)
module.exports = Address
