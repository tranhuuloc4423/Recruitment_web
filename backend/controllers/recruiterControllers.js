const {
  find,
  findById,
  findByIdAndUpdate,
  findByIdAndDelete,
  findOne
} = require('../models/RecruiterModels')
const Recruiter = require('../models/RecruiterModels')

const recruiterControllers = {
  updateBasicInfo: async (req, res) => {
    const { recruiterId } = req.params // recruiterId là _id của User, kiểu String
    const { image, field, tax_id, address, name, email } = req.body

    try {
      // Tìm và cập nhật Recruiter bằng _id (được lưu trong trường `id` của Recruiter)
      const basic_info = await Recruiter.findOneAndUpdate(
        { id: recruiterId }, // Sử dụng `id` vì `id` của Recruiter là `User._id` dạng chuỗi
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
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.status(200).json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { recruiterId } = req.params
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

      const other_info = await Recruiter.findOneAndUpdate(
        { id: recruiterId },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  getDataById: async (req, res) => {
    try {
      const { recruiterId } = req.params
      const recruiter = await Recruiter.findOne({ id: recruiterId })
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  },
  getAllData: async (req, res) => {
    try {
      const recruiter = await Recruiter.find()
      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = recruiterControllers
