const mongoose = require('mongoose')
const Recruiter = require('../models/recruiterModel')
const Address = require('../models/addressModel')
const User = require('../models/userModel')
const Skill = require('../models/skillModel')

// Hàm xác thực địa chỉ
const validateAddress = async (address) => {
  if (address && address.province && address.district && address.ward) {
    const provinceObj = await Address.findById(address.province)
    if (!provinceObj) {
      return { success: false, message: 'Tỉnh/Thành không tồn tại' }
    }

    const districtObj = provinceObj.districts.id(address.district)
    if (!districtObj) {
      return { success: false, message: 'Quận/Huyện không tồn tại' }
    }

    const wardObj = districtObj.wards.id(address.ward)
    if (!wardObj) {
      return { success: false, message: 'Phường/Xã không tồn tại' }
    }

    return { success: true, validatedAddress: address }
  }

  return {
    success: false,
    message: 'Địa chỉ không hợp lệ hoặc thiếu thông tin'
  }
}

const recruiterControllers = {
  // Controller cập nhật thông tin cơ bản
  updateBasicInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { image, field, tax_id, address, name, email, phone } = req.body

    try {
      if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
        return res.status(400).json({ message: 'Invalid recruiterId' })
      }

      const currentRecruiter = await Recruiter.findById(recruiterId)
      if (!currentRecruiter) {
        return res.status(404).json({ message: 'Recruiter không tồn tại' })
      }

      if (email) {
        const emailExists = await User.findOne({
          email: email,
          _id: { $ne: currentRecruiter.userId }
        })
        if (emailExists) {
          return res
            .status(400)
            .json({ message: 'Email đã tồn tại trong hệ thống' })
        }
      }

      let updatedAddress = {}
      if (address) {
        const { success, message, validatedAddress } = await validateAddress(
          address
        )
        if (!success) {
          return res.status(400).json({ message })
        }
        updatedAddress = validatedAddress
      }

      const basic_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
        {
          $set: {
            'basic_info.image': image || currentRecruiter.basic_info.image,
            'basic_info.field': field || currentRecruiter.basic_info.field,
            'basic_info.tax_id': tax_id || currentRecruiter.basic_info.tax_id,
            'basic_info.address': Object.keys(updatedAddress).length
              ? updatedAddress
              : currentRecruiter.basic_info.address,
            'basic_info.name': name || currentRecruiter.basic_info.name,
            'basic_info.email': email || currentRecruiter.basic_info.email,
            'basic_info.phone': phone || currentRecruiter.basic_info.phone
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Recruiter không tồn tại' })
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        {
          $set: {
            name: name || currentRecruiter.basic_info.name,
            email: email || currentRecruiter.basic_info.email
          }
        },
        { new: true }
      )
      /*************  ✨ Codeium Command ⭐  *************/
      /**
       * @function updateOtherInfo
       * @description Updates the other information of a recruiter
       * @param {Object} req - The request object
       * @param {Object} res - The response object
       * @param {string} recruiterId - The id of the recruiter
       * @param {Object} body - The request body
       * @param {string} body.desc - The description of the recruiter
       * @param {Array<string>|string} body.speciality - The specialities of the recruiter
       * @param {Array<string>} body.images - The images of the recruiter
       * @param {Array<{label: string, value: string}>} body.types - The types of the recruiter
       * @param {Array<{label: string, value: string}>} body.wforms - The work forms of the recruiter
       * @returns {Promise<void>}
       */
      /******  2fd6c483-fe51-4b94-9d67-ef209a3958c1  *******/
      if (updatedUser) {
        await updatedUser.save()
      }

      res.json(basic_info)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Controller cập nhật thông tin khác
  updateOtherInfo: async (req, res) => {
    const { recruiterId } = req.params
    const { desc, speciality, images, types, wforms } = req.body

    try {
      if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
        return res.status(400).json({ message: 'Invalid recruiterId' })
      }

      let updateFields = {}

      if (desc !== undefined) updateFields['other_info.desc'] = desc

      if (speciality && Array.isArray(speciality)) {
        const validSpecialities = await Skill.find({
          _id: { $in: speciality }
        }).select('_id')
        updateFields['other_info.speciality'] = validSpecialities.map(
          (s) => s._id
        )
      }

      if (types !== undefined) {
        updateFields['other_info.types'] = Array.isArray(types)
          ? types.map((item) => ({
              label: item.label,
              value: item.value
            }))
          : []
      }

      if (wforms !== undefined) {
        updateFields['other_info.wforms'] = Array.isArray(wforms)
          ? wforms.map((item) => ({
              label: item.label,
              value: item.value
            }))
          : []
      }

      if (images !== undefined) updateFields['other_info.images'] = images

      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ message: 'No fields to update' })
      }

      const other_info = await Recruiter.findOneAndUpdate(
        { _id: recruiterId },
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

  // Lấy thông tin Recruiter theo ID
  getDataById: async (req, res) => {
    const { recruiterId } = req.params
    try {
      if (!mongoose.Types.ObjectId.isValid(recruiterId)) {
        return res.status(400).json({ message: 'Invalid recruiterId' })
      }

      const recruiter = await Recruiter.findById(recruiterId).populate([
        { path: 'basic_info.address.province', select: 'name' },
        { path: 'basic_info.address.district', select: 'name' },
        { path: 'basic_info.address.ward', select: 'name' },
        { path: 'other_info.speciality', select: 'label value' }
      ])

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      res.status(200).json(recruiter)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  },

  // Lấy tất cả Recruiter (có phân trang)
  getAllData: async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10
      const page = parseInt(req.query.page) || 1
      const recruiters = await Recruiter.find()
        .skip((page - 1) * limit)
        .limit(limit)

      res.status(200).json(recruiters)
    } catch (error) {
      res.status(500).json(error)
    }
  },

  // Lấy tất cả bài đăng của Recruiter
  getPosts: async (req, res) => {
    try {
      const { userId } = req.params
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' })
      }

      const recruiter = await Recruiter.findOne({ userId }).populate('posts')

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.posts)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  // Lấy bài đăng đã xác nhận
  getConfirmedPosts: async (req, res) => {
    try {
      const { userId } = req.params
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' })
      }

      const recruiter = await Recruiter.findOne({ userId }).populate(
        'manage_post.confirmed'
      )

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.manage_post.confirmed)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  },

  // Lấy bài đăng đã đăng
  getPostedPosts: async (req, res) => {
    try {
      const { userId } = req.params
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid userId' })
      }

      const recruiter = await Recruiter.findOne({ userId }).populate(
        'manage_post.posted'
      )

      if (!recruiter) {
        return res.status(404).json({ message: 'Recruiter not found' })
      }

      return res.status(200).json(recruiter.manage_post.posted)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}

module.exports = recruiterControllers
