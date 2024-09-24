import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import '../customQuill.css'
const RichText = ({ value, onChange, label, name }) => {
  const [charCount, setCharCount] = useState(0)

  const handleChange = (newValue) => {
    onChange({ target: { name, value: newValue } })
    const plainText = newValue.replace(/<[^>]+>/g, '')
    setCharCount(plainText.length)
  }
  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote'
      ],
      ['link', 'image', 'video']
    ]
  }
  return (
    <div className="w-full">
      <div className="heading-3 text-left">{label}</div>
      <ReactQuill
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
