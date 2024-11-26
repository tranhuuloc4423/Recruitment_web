const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const { uploadImage, uploadImages, validateAddress } = require('../utils/funcs')

const calculateProfileStatus = (admin) => {
  const basicInfoFields = [
    admin.basic_info.image?.public_id,
    admin.basic_info.image?.url,
    admin.basic_info.name,
    admin.basic_info.field,
    admin.basic_info.email,
    admin.basic_info.phone,
    admin.basic_info.tax_id,
    admin.basic_info.address?.province,
    admin.basic_info.address?.district
  ]

  const otherInfoFields = [
    admin.other_info.desc,
    admin.other_info.images?.length > 0,
    admin.other_info.speciality?.length > 0,
    admin.other_info.types?.length > 0,
    admin.other_info.wforms?.length > 0
  ]

  const basicInfoCompleted =
    basicInfoFields.filter(Boolean).length / basicInfoFields.length
  const otherInfoCompleted =
    otherInfoFields.filter(Boolean).length / otherInfoFields.length

  return Math.round(basicInfoCompleted * 50 + otherInfoCompleted * 50)
}

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { id } = req.params
    const { field, tax_id, address, name, email, phone, image } = req.body

    try {
      const currentAdmin = await Admin.findById(id)
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      if (email) {
        const emailExists = await User.findOne({
          email: email,
          _id: { $ne: currentAdmin.userId }
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

      const imageResult = await uploadImage(currentAdmin, image, 'admin/basic')

      const basic_info = await Admin.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            'basic_info.image': imageResult,
            'basic_info.field': field,
            'basic_info.tax_id': tax_id,
            'basic_info.address': updatedAddress,
            'basic_info.name': name,
            'basic_info.email': email,
            'basic_info.phone': phone
          }
        },
        { new: true }
      )

      if (!basic_info) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      const updatedUser = await User.findOneAndUpdate(
        { _id: basic_info.userId },
        { $set: { name: name, email: email } },
        { new: true }
      )

      if (!updatedUser)
        return res.status(404).json({ message: 'Người dùng không tìm thấy' })

      const profileStatus = calculateProfileStatus(basic_info) // Tính toán profileStatus
      await Admin.updateOne({ _id: id }, { profileStatus })

      res.json({
        message: 'Cập nhật thành công!',
        data: basic_info
      })
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { id } = req.params
    const { desc, speciality, types, wforms, images } = req.body
    let updateFields = {}

    try {
      const currentAdmin = await Admin.findById(id)
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      if (desc) updateFields['other_info.desc'] = desc
      if (speciality) {
        updateFields['other_info.speciality'] = Array.isArray(speciality)
          ? speciality
          : [speciality]
      }
      if (types) {
        updateFields['other_info.types'] = Array.isArray(types)
          ? types
          : [types]
      }
      if (wforms) {
        updateFields['other_info.wforms'] = Array.isArray(wforms)
          ? wforms
          : [wforms]
      }

      if (images) {
        const imagesResult = await uploadImages(
          currentAdmin,
          images,
          'admin/other'
        )
        updateFields['other_info.images'] = imagesResult
      }

      if (Object.keys(updateFields).length === 0) {
        return res
          .status(400)
          .json({ message: 'Không có trường nào để cập nhật' })
      }

      const other_info = await Admin.findOneAndUpdate(
        { _id: id },
        { $set: updateFields },
        { new: true }
      )

      if (!other_info) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }

      res.status(200).json(other_info)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  getDataById: async (req, res) => {
    const { id } = req.params
    try {
      const admin = await Admin.findOne({ userId: id })

      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  getDataByIdRole: async (req, res) => {
    const { id } = req.params
    try {
      const admin = await Admin.findById(id)
      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  getAllData: async (req, res) => {
    try {
      const admin = await Admin.find()
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  getPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate('posts')
      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin.posts)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  },

  getConfirmedPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate(
        'manage_post.confirmed'
      )
      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin.manage_post.confirmed)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  },

  getPostedPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate(
        'manage_post.posted'
      )
      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin.manage_post.posted)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  },
  getExpiredPosts: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).populate(
        'manage_post.expired'
      )
      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin.manage_post.posted)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ', error })
    }
  }
}

module.exports = adminControllers
