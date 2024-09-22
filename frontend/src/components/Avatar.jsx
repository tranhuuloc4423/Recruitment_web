import React, { useEffect, useRef, useState } from 'react'
import { CiCamera } from 'react-icons/ci'
const Avatar = ({ file, setFile }) => {
  const [blob, setBlob] = useState('')
  const inputFileRef = useRef(null)

  useEffect(() => {
    if (file) {
      setBlob(URL.createObjectURL(file))
      console.log(file)
    }

    return () => {
      URL.revokeObjectURL(blob)
    }
  }, [file])

  const onFileChange = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      if (!newFile.type.match('image.*')) {
      } else {
        inputFileRef.current && (inputFileRef.current.value = null)

        setFile(newFile)
      }
    }
  }

  return (
    <div
      style={{
        '--bg': `url(${blob})`
      }}
      onClick={() => inputFileRef.current && inputFileRef.current.click()}
      className={`${
        blob ? 'before-bg-file' : ''
      } relative rounded-full overflow-hidden cursor-pointer h-[180px] w-[180px] mx-auto flex flex-col items-center border-2 border-collapse border-primary text-base leading-[1.6] select-none`}
    >
      {blob && (
        <img
          src={blob}
          alt="Preview ảnh"
          className="absolute top-0 left-0 w-full h-full object-cover "
        />
      )}
      <div
        className={`absolute left-0 w-full h-full flex justify-center items-center bg-overlay transition-opacity ${
          blob ? 'opacity-0 hover:opacity-100' : 'opacity-100'
        }`}
      >
        <span>
          <CiCamera size={32} color="#fff" />
        </span>
      </div>
      <input
        ref={inputFileRef}
        onChange={onFileChange}
        type="file"
        accept="image/*"
        hidden
      />
    </div>
  )
}

export default Avatar
