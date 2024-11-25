import ReactSlider from 'react-slider'

const Slider = ({ value, setValue, label, step = 1, max = 100 }) => {
  const handleLabel = () => {
    switch (label) {
      case 'Mức Lương':
        return value === 0 ? `${value} vnđ` : `${value}.000.000 vnđ`
      case 'Số lượng ứng viên':
        return `${value} người`
      default:
        return value
    }
  }

  return (
    <div className="w-full">
      <div className="mt-4">
        <span>
          {label}: {handleLabel()}
        </span>
      </div>
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="example-track"
        value={value}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
        onChange={setValue}
        step={step}
        max={max}
      />
    </div>
  )
}

export default Slider
