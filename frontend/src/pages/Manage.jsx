import React, { useEffect, useState } from 'react'
import { Nav } from '../components'
import { manageNav } from '../utils/nav'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
const Manage = () => {
  const [nav, setNav] = useState([])
  const { currentUser } = useSelector((state) => state.auth)

  useEffect(() => {
    let currentNav = manageNav?.find(
      (nav) => nav.name === currentUser?.role
    ).nav
    setNav(currentNav)
  }, [currentUser?.role])

  return (
    <div className="w-full">
      <Nav data={nav}></Nav>
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  )
}

export default Manage
