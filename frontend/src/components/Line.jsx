import React from 'react'

const Line = ({ direction = 'x' }) => {
  return (
    <>
      {direction === 'x' ? (
        <div className="w-full h-px bg-gray-200 dark:bg-gray-700" />
      ) : (
        <div className="w-[1px] bg-gray-200 dark:bg-gray-700" />
      )}
    </>
  )
}

export default Line
