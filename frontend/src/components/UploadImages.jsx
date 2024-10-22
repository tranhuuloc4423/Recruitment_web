import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { toast } from 'react-toastify'

const UploadImages = ({ files, setFiles }) => {
  const [images, setImages] = useState([])

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files)

    // Kiểm tra tổng số file hiện tại và file mới được chọn
    const totalFiles = images.length + selectedFiles.length

    // Nếu tổng số file vượt quá 5, chỉ giữ lại 5 file
    if (totalFiles > 5) {
      toast.info('Bạn chỉ được chọn tối đa 5 hình ảnh!')
      const limitedFiles = selectedFiles.slice(0, 5 - images.length) // Lấy các file mới sao cho không vượt quá giới hạn
      const newImages = limitedFiles.map((file) => URL.createObjectURL(file))
      setFiles((prevFiles) => [...prevFiles, ...limitedFiles])
      setImages((prevImages) => [...prevImages, ...newImages])
    } else {
      const newImages = selectedFiles.map((file) => URL.createObjectURL(file))
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles])
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index])
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    // Cập nhật lại files sau khi xóa ảnh
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  useEffect(() => {}, [images.length])

  return (
    <div className="flex flex-col items-start w-full">
      <label className="flex flex-col cursor-pointer mb-4 w-full border px-4 py-2 rounded ">
        <span className="text-left text-gray-500">Chọn Hình Ảnh</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
      <div>Hình ảnh đã chọn : </div>
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4 mt-2 w-full border border-black rounded p-4 max-h-[350px] overflow-y-auto">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`preview-${index}`}
                className="w-full h-[100px] object-cover"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-second shadow-md rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
              >
                <IoClose size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UploadImages
