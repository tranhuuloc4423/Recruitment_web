import React, { useState } from 'react'

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const getVisibleImages = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    const nextIndex = (currentIndex + 1) % images.length

    return [
      { ...images[prevIndex], position: 'left' },
      { ...images[currentIndex], position: 'center' },
      { ...images[nextIndex], position: 'right' }
    ]
  }

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden">
      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute left-2 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
      >
        {'<'}
      </button>

      {/* Image Container */}
      <div className="flex w-full justify-center items-center gap-4">
        {getVisibleImages().map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={image.alt || `Image ${index}`}
            className={`transition-all duration-500 rounded ${
              image.position === 'center'
                ? 'w-[150px] scale-110'
                : 'w-[100px] opacity-70'
            }`}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-2 z-10 bg-gray-200 rounded-full p-2 hover:bg-gray-300"
      >
        {'>'}
      </button>
    </div>
  )
}

export default ImageSlider
