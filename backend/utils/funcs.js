const Address = require('../models/addressModel')
const cloudinary = require('./cloudinary')
const uploadImage = async (currentRole, image, folder) => {
  // Nếu image là URL, giữ nguyên ảnh cũ
  if (typeof image === "string" && image.startsWith("http")) {
    return currentRole?.basic_info?.image; // Giữ ảnh cũ
  }

  // Xóa ảnh cũ nếu tồn tại
  if (currentRole?.basic_info?.image?.public_id) {
    await cloudinary.uploader.destroy(currentRole.basic_info.image.public_id);
  }

  // Tải ảnh mới lên Cloudinary
  const imageResult = await cloudinary.uploader.upload(image, {
    folder: folder,
    crop: "limit",
    quality: 80,
  });

  return {
    public_id: imageResult.public_id,
    url: imageResult.secure_url,
  };
};


const uploadImages = async (currentRole, images, folder) => {
  // Lọc ra ảnh mới cần upload (chỉ giữ file, bỏ qua URL)
  const newImages = images.filter((img) => !(typeof img === "string" && img.startsWith("http")));

  // Lấy danh sách ảnh cũ nếu có
  const oldImages = images.filter((img) => typeof img === "string" && img.startsWith("http"));

  // Xóa tất cả ảnh cũ chỉ nếu có ảnh mới được chọn
  if (newImages.length > 0 && currentRole?.other_info?.images?.length > 0) {
    const deletePromises = currentRole.other_info.images.map((image) =>
      cloudinary.uploader.destroy(image.public_id)
    );
    await Promise.all(deletePromises);
  }

  // Giới hạn số lượng ảnh tối đa
  const imagesToUpload = newImages.slice(0, 5 - oldImages.length); // Đảm bảo tổng số ảnh không vượt quá 5

  // Tải các ảnh mới lên Cloudinary
  const uploadPromises = imagesToUpload.map((image) =>
    cloudinary.uploader.upload(image, {
      folder: folder,
      crop: "limit",
      quality: 80,
    })
  );

  try {
    const results = await Promise.all(uploadPromises);
    const uploadedImages = results.map((imageResult) => ({
      public_id: imageResult.public_id,
      url: imageResult.secure_url,
    }));

    return [...oldImages.map((url) => ({ url })), ...uploadedImages]; // Giữ cả ảnh cũ và mới
  } catch (error) {
    console.error("Lỗi khi tải ảnh lên:", error);
    throw new Error("Lỗi khi tải ảnh lên Cloudinary");
  }
};


const validateAddress = async (address) => {
  if (address.province && address.district) {
    const provinceObj = await Address.findOne({ name: address.province.name })
    if (!provinceObj) {
      return { success: false, message: 'Tỉnh/Thành không tồn tại' }
    }

    const districtObj = provinceObj.districts.find(
      (district) => district.name === address.district.name
    )
    if (!districtObj) {
      return { success: false, message: 'Quận/Huyện không tồn tại' }
    }

    return {
      success: true,
      validatedAddress: {
        province: { name: provinceObj.name, code: provinceObj.code },
        district: { name: districtObj.name, code: districtObj.code }
      }
    }
  }

  return {
    success: false,
    message: 'Địa chỉ không hợp lệ hoặc thiếu thông tin'
  }
}

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const parseDate = (dateString) => {
  const [day, month, year] = dateString.split('/').map(Number)
  return new Date(year, month - 1, day) // Tháng trong JS bắt đầu từ 0
}

module.exports = {
  uploadImage,
  uploadImages,
  validateAddress,
  formatDate,
  parseDate
}
