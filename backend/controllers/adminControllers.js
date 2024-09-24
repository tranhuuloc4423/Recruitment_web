const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/adminModels')
const Admin = require('../models/adminModels')

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const basic_info = await Admin.findOneAndUpdate({ id: id }, req.body, {
        new: true
      })
      res.status(200).json(basic_info)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  updateOtherInfo: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const other_info = await Admin.findOneAndUpdate({ id: id }, req.body, {
        new: true
      })
      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getDataById: async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      const admin = await Admin.findOne({ id: id })
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const admin = await Admin.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = adminControllers
