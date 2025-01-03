import React from 'react'

const StatusTag = ({ state }) => {
  return (
    <div className="relative inline-block">
      {state === 'superhot' ? (
        <div className="px-4 py-1 bg-red text-white uppercase relative border border-black-100 border-r-0 rounded-l">
          <span className="para-1">superhot</span>
        </div>
      ) : state === 'hot' ? (
        <div className="px-4 py-1 bg-second text-white uppercase relative border border-black-100 border-r-0 rounded-l">
          <span className="para-1">hot</span>
        </div>
      ) : state === 'normal' ? (
        <div></div>
      ) : null}
    </div>
  )
}

export default StatusTag
