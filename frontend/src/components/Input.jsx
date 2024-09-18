import { useState } from 'react'

const Input = (props) => {
  const [focused, setFocused] = useState(false)
  const { label, onChange, id, className, required, error, ...inputProps } =
    props

  const handleFocus = (e) => {
    setFocused(true)
  }
  return (
    <div className={`${className} input`}>
      <div className="text-left w-full flex gap-1 items-center">
        {label}
        {required && <div className="text-red">*</div>}
      </div>
      <input
        {...inputProps}
        className="outline-none flex-1 border-2 w-full p-2 rounded-md"
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === 'confirmPassword' && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="text-left w-full">{error}</span>
    </div>
  )
}

export default Input
