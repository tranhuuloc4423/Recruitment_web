const cloudinary = require('./cloudinary')

const uploadImage = async (currentRole, image, folder) => {
  // Xóa ảnh cũ nếu tồn tại
  if (
    currentRole?.basic_info?.image &&
    currentRole?.basic_info?.image?.public_id
  ) {
    await cloudinary.uploader.destroy(currentRole?.basic_info?.image?.public_id)
  }

  // Tải ảnh mới lên Cloudinary
  const imageResult = await cloudinary.uploader.upload(image, {
    folder: folder, // Thư mục lưu ảnh
    crop: 'limit', // Giữ tỷ lệ khung hình
    quality: 80 // Chất lượng ảnh
  })

  return {
    public_id: imageResult.public_id,
    url: imageResult.secure_url
  }
}

const uploadImages = async (currentRole, images, folder) => {
  // Xóa tất cả ảnh cũ trong other_info.images nếu có
  if (
    currentRole?.other_info?.images &&
    currentRole?.other_info?.images.length > 0
  ) {
    const deletePromises = currentRole?.other_info?.images.map((image) => {
      return cloudinary.uploader.destroy(image.public_id)
    })
    await Promise.all(deletePromises)
  }

  // Giới hạn số lượng ảnh tối đa
  const imagesToUpload = images.slice(0, 5) // Lấy tối đa 5 ảnh

  // Tải các ảnh mới lên Cloudinary
  const uploadPromises = imagesToUpload.map((image) => {
    return cloudinary.uploader.upload(image, {
      folder: folder, // Thư mục lưu ảnh
      crop: 'limit', // Giữ tỷ lệ khung hình
      quality: 80 // Chất lượng ảnh
    })
  })

  try {
    const results = await Promise.all(uploadPromises)
    return results.map((imageResult) => ({
      public_id: imageResult.public_id,
      url: imageResult.secure_url
    }))
  } catch (error) {
    console.error('Lỗi khi tải ảnh lên:', error)
    throw new Error('Lỗi khi tải ảnh lên Cloudinary')
  }
}

module.exports = {
  uploadImage,
  uploadImages
}
