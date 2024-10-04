const Admin = require('../models/adminModel')
const User = require('../models/userModel')

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params
    const { image, field, tax_id, address, name, email } = req.body

    try {
      const basic_info = await Admin.findOneAndUpdate(
        { _id: adminId },
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

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        {
          $set: {
            email: email,
            name: name
          }
        },
        { new: true }
      )

      await updatedUser.save()

      if (!basic_info) {
        return res.status(404).json({ message: 'Admin not found' })
      }

      res.json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },
  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params
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
        { _id: adminId },
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
      const admin = await Admin.findOne({ userId: adminId })
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
