import React, { useRef, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'

const RichText = () => {
  const editorRef = useRef(null)
  const [content, setContent] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    list: false
  })

  const formatText = (command, style) => {
    document.execCommand(command, false, null)

    setActiveStyles((prevStyles) => ({
      ...prevStyles,
      [style]: !prevStyles[style]
    }))
  }

  const handleInput = (e) => {
    const text = e.currentTarget.innerText
    setContent(text)
    setCharCount(text.replace(/\s/g, '').length)
  }

  return (
    <div className="w-full">
      <div className="border-b border-gray-50 flex flex-row bg-gray-300 rounded-tl rounded-tr overflow-hidden">
        <button
          className={`py-2 px-3 ${
            activeStyles.bold ? 'bg-[rgba(0,0,0,0.25)]' : ''
          }`}
          onClick={() => formatText('bold', 'bold')}
        >
          <b>B</b>
        </button>
        <button
          className={`py-2 px-3 ${
            activeStyles.italic ? 'bg-[rgba(0,0,0,0.25)]' : ''
          }`}
          onClick={() => formatText('italic', 'italic')}
        >
          <i>I</i>
        </button>
        <button
          className={`py-2 px-3 ${
            activeStyles.underline ? 'bg-[rgba(0,0,0,0.25)]' : ''
          }`}
          onClick={() => formatText('underline', 'underline')}
        >
          <u>U</u>
        </button>
        <button
          className={`py-2 px-3 ${
            activeStyles.list ? 'bg-[rgba(0,0,0,0.25)]' : ''
          }`}
          onClick={() => formatText('insertOrderedList', 'list')}
        >
          <BsThreeDots />
        </button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        className="border outline-none min-h-[200px] rounded"
        onInput={handleInput}
      />
      <p>{charCount}/2500 ký tự</p>
    </div>
  )
}

export default RichText
