import React, { useEffect, useState } from 'react'

const ProgressBar = ({ progress }) => {
  const [currentProgress, setCurrentProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProgress((prev) => {
        if (prev < progress) {
          return prev + 1
        } else {
          clearInterval(interval)
          return prev
        }
      })
    }, 35)

    return () => clearInterval(interval)
  }, [progress])

  return (
    <div className="flex items-center gap-4">
      {/* Half Circle Progress Bar */}
      <div className="relative w-56 h-28">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background Circle */}
          <path
            d="M 20 80 A 80 80 0 1 1 180 80"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
          />
          {/* Progress Circle */}
          <path
            d="M 20 80 A 80 80 0 1 1 180 80"
            fill="none"
            stroke="#284F9E"
            strokeWidth="16"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (251.2 * currentProgress) / 100}
            style={{
              transition: 'stroke-dashoffset 0.3s ease'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{currentProgress}%</span>
        </div>
      </div>
      {/* Text */}
      <div className="">
        <p>
          Nâng cấp hồ sơ của bạn lên <span className="font-bold">80%</span> để
          bắt đầu tạo CV chuyên nghiệp.
        </p>
      </div>
    </div>
  )
}

export default ProgressBar