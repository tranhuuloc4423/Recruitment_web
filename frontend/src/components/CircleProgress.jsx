import React from 'react'

const CircleProgress = ({ percent }) => {
  const circleRadius = 45 // Bán kính vòng tròn
  const circumference = 2 * Math.PI * circleRadius // Chu vi vòng tròn
  const offset = circumference - (percent / 100) * circumference // Offset để hiển thị tiến trình

  return (
    <div className="flex flex-col items-center">
      <svg
        className="w-24 h-24"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vòng tròn nền */}
        <circle
          className="text-gray-200"
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
        {/* Vòng tròn tiến trình */}
        <circle
          className="text-red-500"
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      {/* Text ở giữa */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xl font-bold">{percent}%</span>
        <p className="text-sm text-gray-500">Hoàn thành</p>
      </div>
    </div>
  )
}

export default CircleProgress
