import React from 'react'

const Line = ({ direction = 'x' }) => {
  return (
    <>
      {direction === 'x' ? (
        <div className="w-full h-px bg-black-100" />
      ) : (
        <div className="w-[1px] bg-black-100" />
      )}
    </>
  )
}

export default Line
