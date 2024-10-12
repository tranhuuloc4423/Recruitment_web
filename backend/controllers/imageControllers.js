const Image = require('../models/imageModel')
const cloudinary = require('cloudinary').v2

const imageControllers = {
  uploadImage: async (req, res) => {
    try {
      const { path, public_id } = req.file

      const newImage = new Image({ public_id, url: path })
      await newImage.save()

      res.status(201).json({
        message: 'Upload thành công!',
        data: newImage
      })
    } catch (error) {
      res.status(500).json({ message: 'Upload thất bại!', error })
    }
  },
  getAllImages: async (req, res) => {
    try {
      const images = await Image.find()
      res.status(200).json(images)
    } catch (error) {
      res.status(500).json({ message: 'Không thể lấy danh sách ảnh!', error })
    }
  },
  getImageById: async (req, res) => {
    try {
      const { id } = req.params
      const image = await Image.findById(id)

      if (!image) {
        return res.status(404).json({ message: 'Ảnh không tồn tại!' })
      }

      res.status(200).json(image)
    } catch (error) {
      res.status(500).json({ message: 'Không thể lấy ảnh!', error })
    }
  },
  deleteImageById: async (req, res) => {
    try {
      const { id } = req.params
      const image = await Image.findById(id)

      if (!image) {
        return res.status(404).json({ message: 'Ảnh không tồn tại!' })
      }
      await cloudinary.uploader.destroy(image.public_id)
      await image.remove()

      res.status(200).json({ message: 'Xóa ảnh thành công!' })
    } catch (error) {
      res.status(500).json({ message: 'Không thể xóa ảnh!', error })
    }
  },

  updateImageById: async (req, res) => {
    try {
      const { id } = req.params
      const { public_id, url } = req.body

      const updatedImage = await Image.findByIdAndUpdate(
        id,
        { public_id, url },
        { new: true, runValidators: true }
      )

      if (!updatedImage) {
        return res.status(404).json({ message: 'Ảnh không tồn tại!' })
      }

      res.status(200).json({
        message: 'Cập nhật ảnh thành công!',
        data: updatedImage
      })
    } catch (error) {
      res.status(500).json({ message: 'Không thể cập nhật ảnh!', error })
    }
  }
}

module.exports = imageControllers
