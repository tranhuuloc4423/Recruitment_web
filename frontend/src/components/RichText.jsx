import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import '../customQuill.css'
const RichText = ({
  value,
  onChange,
  label,
  name,
  template = false,
  hasImage = false
}) => {
  const [charCount, setCharCount] = useState(0)
  const richRef = useRef(null)
  const handleChange = (newValue) => {
    onChange({ target: { name, value: newValue } })
    const plainText = newValue.replace(/<[^>]+>/g, '')
    setCharCount(plainText.length)
  }

  const handleInsertTemplate = () => {
    if (template) {
      const templateText = template // Nội dung mẫu
      const newValue = value + templateText
      onChange({ target: { name, value: newValue } })
      setCharCount(newValue.replace(/<[^>]+>/g, '').length)
    } else {
      return
    }
  }

  const modules = {
    toolbar: [
      [
        { header: '1' },
        { header: '2' },
        { list: 'ordered' },
        { list: 'bullet' },
        'bold',
        'italic',
        'underline',
        'link',
        hasImage ? 'image' : ''
      ]
    ]
  }

  return (
    <div className="w-full">
      <div className="heading-3 font-medium text-left flex flex-row justify-between items-center py-2">
        <span>{label}</span>
        {template && (
          <span
            className="para-1 border-second border-2 rounded px-1 cursor-pointer"
            onClick={handleInsertTemplate}
          >
            Chèn mẫu
          </span>
        )}
      </div>
      <ReactQuill
        ref={richRef}
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
      />
      <div className="text-left text-gray-500 text-sm mt-2">
        {charCount} ký tự
      </div>
    </div>
  )
}

export default RichText
