import { useState } from 'react'
import { Link } from 'react-router-dom'

const Nav = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(
    data.findIndex((item) => item.active)
  )

  const handlePath = (index) => {
    setActiveIndex(index)
  }
  return (
    <div className={`flex justify-center items-center w-full bg-white rounded`}>
      {data.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          onClick={() => handlePath(index)}
          className={`p-4 para-1 ${
            activeIndex === index
              ? 'text-primary border-b-2 border-primary'
              : ''
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default Nav
