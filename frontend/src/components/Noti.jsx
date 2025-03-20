import React, { useEffect, useState, useRef } from 'react'
import { GoBell } from 'react-icons/go'
import { deleteNotification, GetNotification } from '../redux/api/app'
import { useSelector } from 'react-redux'
import { formatDateIso } from '../utils/functions'
import { IoClose } from "react-icons/io5"
import { useLocation } from 'react-router-dom'

const Noti = () => {
  const [active, setActive] = useState(false)
  const [notifications, setNotifications] = useState([])
    const { currentRole } = useSelector((state) => state.app)
  
  const location = useLocation()
  const notiRef = useRef(null)

  const getNotifications = async () => {
    const res = await GetNotification(currentRole?._id)
    setNotifications(res)
  }

  const handleDelete = async (id) => {
    await deleteNotification(id)
    setNotifications((prev) => prev.filter((item) => item._id !== id))
  }

  useEffect(() => {
    if(currentRole) {
      getNotifications()
    }
  }, [currentRole])

  useEffect(() => {
    if (location.pathname === '/posts/') {
      getNotifications()
    }
  }, [location.pathname])

  // Đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notiRef.current && !notiRef.current.contains(event.target)) {
        setActive(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={notiRef}>
      <div className="cursor-pointer relative" onClick={() => setActive(!active)}>
        <GoBell size={24} color="white" />
        {notifications?.length > 0 && (
          <span className="absolute top-[-6px] right-[-6px] bg-second text-sm font-bold px-2 py-0.5 rounded-full">
            {notifications?.length}
          </span>
        )}
      </div>
      <div
        className={`w-[400px] z-[9999] bg-white shadow-lg rounded-lg overflow-hidden absolute top-[100%] right-0 transition-all ${
          active ? 'translate-y-0 opacity-100 visible' : 'translate-y-5 opacity-0 invisible'
        }`}
      >
        <div className="bg-second w-full heading-3 px-4 py-3 flex justify-between items-center">
          <span className="text-black font-semibold">Thông báo</span>
        </div>
        <ul className="divide-y divide-gray-200 max-h-[300px] overflow-auto">
          {notifications?.length > 0 ? (
            notifications?.map((item) => (
              <li className="p-4 flex items-center justify-between hover:bg-gray-100 transition" key={item._id}>
                <div className="ml-3">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-600 line-clamp-2 overflow-hidden text-ellipsis">{item.desc}</p>
                  <p className="text-xs text-gray-500">{formatDateIso(item.createdAt)}</p>
                </div>
                <span className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => handleDelete(item._id)}>
                  <IoClose size={20} />
                </span>
              </li>
            ))
          ) : (
            <li className="p-4 text-center text-gray-500">Không có thông báo</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Noti
