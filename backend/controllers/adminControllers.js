const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/AdminModels')
const Admin = require('../models/AdminModels')

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params // adminId là _id của User, kiểu String
    const { image, field, tax_id, address, name, email } = req.body

    try {
      // Tìm kiếm và cập nhật Admin bằng `id`, vì `id` được lưu là `User._id.toString()`
      const basic_info = await Admin.findOneAndUpdate(
        { id: adminId }, // Sử dụng `id` thay vì `_id`
        {
          $set: {
            'basic_info.image': image,
            'basic_info.field': field,
            'basic_info.tax_id': tax_id,
            'basic_info.address': address,
            'basic_info.name': name,
            'basic_info.email': email
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params // adminId là _id của User, kiểu String
    const { desc, speciality, images } = req.body

    try {
      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc
      if (speciality !== undefined)
        updateFields['other_info.speciality'] = speciality
      if (images !== undefined) updateFields['other_info.images'] = images

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Admin.findOneAndUpdate(
        { id: adminId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  getDataById: async (req, res) => {
    try {
      const { adminId } = req.params
      const admin = await Admin.findOne({ id: adminId })
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
