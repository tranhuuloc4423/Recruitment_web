import { useRef, useState } from 'react'

const Input = (props) => {
  const [focused, setFocused] = useState(false)
  const {
    label,
    onChange,
    id,
    className,
    required,
    error,
    type,
    ...inputProps
  } = props

  const handleFocus = (e) => {
    setFocused(true)
  }
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            {...inputProps}
            className="outline-none border-2 w-full p-2 rounded-md"
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          >
            {inputProps.options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        )
      case 'file':
        return (
          <input
            type="file"
            {...inputProps}
            className="outline-none border-2 w-full p-2 rounded-md"
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          />
        )
      case 'date':
        return (
          <input
            type="date"
            {...inputProps}
            className="outline-none border-2 w-full p-2 rounded-md"
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
          />
        )
      default:
        return (
          <input
            {...inputProps}
            type={type}
            className="outline-none border-2 w-full p-2 rounded-md"
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() =>
              inputProps.name === 'confirmPassword' && setFocused(true)
            }
            focused={focused.toString()}
          />
        )
    }
  }

  return (
    <div className={`${className} input`}>
      <div className="text-left w-full flex gap-1 items-center">
        {label}
        {required && <div className="text-red">*</div>}
      </div>
      {renderInput()}
      <span className="text-left w-full">{error}</span>
    </div>
  )
}

export default Input
