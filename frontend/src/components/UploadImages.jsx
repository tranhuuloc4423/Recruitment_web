import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'

const UploadImages = () => {
  const [images, setImages] = useState([])

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files)
    const newImages = files.map((file) => URL.createObjectURL(file))
    setImages((prevImages) => [...prevImages, ...newImages])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index])
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
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
