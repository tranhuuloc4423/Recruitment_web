const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Address = require('../models/addressModel')
const { uploadImage, uploadImages, validateAddress } = require('../utils/funcs')

const adminControllers = {
  updateBasicInfo: async (req, res) => {
    const { adminId } = req.params
    const { field, tax_id, address, name, email, phone, image } = req.body

    try {
      const currentAdmin = await Admin.findById(adminId)
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
        { _id: adminId },
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

      res.json({ admin: basic_info, user: updatedUser })
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  updateOtherInfo: async (req, res) => {
    const { adminId } = req.params
    const { desc, speciality, types, wforms, images } = req.body
    let updateFields = {}

    try {
      const currentAdmin = await Admin.findById(adminId)
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
        updateFields['other_info.types'] = types.map((item) => ({
          name: item.name,
          value: item.value
        }))
      }
      if (wforms) {
        updateFields['other_info.wforms'] = wforms.map((item) => ({
          name: item.name,
          value: item.value
        }))
      }

      const imagesResult = await uploadImages(
        currentAdmin,
        images,
        'admin/other'
      )

      if (images) {
        updateFields['other_info.images'] = imagesResult
      }

      if (Object.keys(updateFields).length === 0) {
        return res
          .status(400)
          .json({ message: 'Không có trường nào để cập nhật' })
      }

      const other_info = await Admin.findOneAndUpdate(
        { _id: adminId },
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
    const { adminId } = req.params
    try {
      const admin = await Admin.findOne({ userId: adminId })

      if (!admin) {
        return res.status(404).json({ message: 'Admin không tồn tại' })
      }
      res.status(200).json(admin)
    } catch (error) {
      res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message })
    }
  },

  getDataByIdRole: async (req, res) => {
    const { adminId } = req.params
    try {
      const admin = await Admin.findById(adminId)

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
  }
}

module.exports = adminControllers
