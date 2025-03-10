import React, { useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import '../customQuill.css'
import { toast } from 'react-toastify'

const RichText = ({
  value,
  onChange,
  label,
  name,
  template = false,
  hasImage = false,
  max = 1000
}) => {
  const [charCount, setCharCount] = useState(0)
  const richRef = useRef(null)

  const handleChange = (newValue) => {
    const plainText = newValue.replace(/<[^>]+>/g, '') // Loại bỏ các thẻ HTML để đếm ký tự thực

    // Kiểm tra nếu vượt quá giới hạn max
    if (plainText.length > max) {
      toast.error(`Vui lòng nhập ít hơn ${max} ký tự`)
      return // Không cho phép cập nhật nếu vượt quá giới hạn
    }

    // Nếu hợp lệ, cập nhật state và gọi onChange
    setCharCount(plainText.length)
    onChange({ target: { name, value: newValue } })
  }

  const handleInsertTemplate = () => {
    if (!template) return

    const templateText = template // Nội dung mẫu
    const currentPlainText = value ? value.replace(/<[^>]+>/g, '') : ''
    const newPlainText = currentPlainText + templateText.replace(/<[^>]+>/g, '')

    // Kiểm tra nếu chèn mẫu vượt quá giới hạn
    if (newPlainText.length > max) {
      toast.error(`Nội dung mẫu vượt quá giới hạn ${max} ký tự`)
      return
    }

    // Nếu hợp lệ, chèn mẫu
    const newValue = value ? value + templateText : templateText
    onChange({ target: { name, value: newValue } })
    setCharCount(newPlainText.length)
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
        value={charCount > max ? value : value} // Chặn cập nhật nếu vượt giới hạn
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
