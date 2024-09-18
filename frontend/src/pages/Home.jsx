import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
  const { signin } = useSelector((state) => state.auth)

  useEffect(() => {
    if (signin.currentUser) {
      console.log(signin.currentUser)
    }
  }, [signin.currentUser])
  return (
    <div className="">
      {signin.currentUser && <div>{signin.currentUser.role}</div>}
    </div>
  )
}

export default Home
