import { useState } from "react"
import { Link } from "react-router-dom"

const Nav = (props) => {
    const { data } = props
    const [paths, setPaths] = useState(data)

    const handlePath = (index) => {
        const updatedPath = paths.map((path, i) => ({
            ...path,
            active: i === index, 
          }));
          setPaths(updatedPath);
    }
    return <div className={`flex justify-center items-center w-full bg-white rounded`}>
        {data.map((item, index) => (
            <Link key={item.id} to={item.path} onClick={() => handlePath(index)} className={`p-4 para-1 ${item.active ? 'text-primary border-b-2 border-primary' : ''}`}>
                {item.name}
            </Link>
        ))}
    </div>
}

export default Nav