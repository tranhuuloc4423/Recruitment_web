import React, { useState } from 'react'
import { GoBell } from 'react-icons/go'
const Noti = () => {
  const [active, setActive] = useState(false)
  return (
    <div className="relative cursor-pointer" onClick={() => setActive(!active)}>
      <div>
        <GoBell size={24} color="white" />
      </div>
      <div
        className={`w-72 bg-white shadow-md rounded overflow-hidden absolute top-[100%] right-[-8px] transition-all ${
          active ? 'translate-y-0' : '-translate-y-10 opacity-0'
        }`}
      >
        <div className="bg-second text-white heading-3 px-4 py-2 flex justify-between items-center">
          <span>Notifications</span>
          <button className="focus:outline-none">
            <span className="material-icons">settings</span>
          </button>
        </div>
        <ul className="divide-y divide-gray-200">
          <li className="p-4 flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="Brigid Dawson"
            />
            <div className="ml-3">
              <p className="text-sm">
                <span className="font-medium">Brigid Dawson</span> followed you
              </p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </li>
          {/* <li className="p-4 flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="John Dwyer"
            />
            <div className="ml-3">
              <p className="text-sm">
                <span className="font-medium">John Dwyer</span> liked your post
              </p>
              <p className="text-xs text-gray-500">Yesterday</p>
            </div>
          </li>
          <li className="p-4 flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="Tim Hellman"
            />
            <div className="ml-3">
              <p className="text-sm">
                <span className="font-medium">Tim Hellman</span> liked your post
              </p>
              <p className="text-xs text-gray-500">Tuesday</p>
            </div>
          </li>
          <li className="p-4 flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src="https://via.placeholder.com/40"
              alt="Shannon Shaw"
            />
            <div className="ml-3">
              <p className="text-sm">
                <span className="font-medium">Shannon Shaw</span> commented on
                your post
              </p>
              <p className="text-xs text-gray-500">4 days ago</p>
            </div>
          </li> */}
        </ul>
        <div className="p-4 bg-gray-50 text-center">
          <a href="#" className="text-primary">
            See all recent activity
          </a>
        </div>
      </div>
    </div>
  )
}

export default Noti
