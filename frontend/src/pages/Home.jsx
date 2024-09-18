import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { currentUser } = useSelector((state) => state.auth)

  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser)
    }
  }, [currentUser])
  return <div>{currentUser?.role}</div>
}

export default Home
