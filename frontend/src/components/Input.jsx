import { useState } from 'react'

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

  const [selectedValue, setSelectedValue] = useState(
    props.inputProps?.options[0].value
  )

  const handleFocus = (e) => {
    setFocused(true)
  }
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value)
    onChange(e)
  }

  const handleDateChange = (e) => {
    const date = new Date(e.target.value)
    const formattedDate = date.toLocaleDateString('en-GB') // Formats to dd/mm/yyyy
    setSelectedValue(formattedDate)
    onChange(e)
  }
  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            {...inputProps}
            className="outline-none border-2 w-full p-2 rounded-md"
            onChange={handleSelectChange}
            onBlur={handleFocus}
            onFocus={() => setFocused(true)}
            focused={focused.toString()}
            value={selectedValue}
          >
            {inputProps.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
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
            onChange={handleDateChange}
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
            className="outline-none border-2 w-full py-2 px-4 rounded-md"
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
