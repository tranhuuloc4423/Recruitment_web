import ReactSlider from 'react-slider'

const RangeSlider = ({ values, setValues }) => {
  return (
    <div className="w-full">
      <ReactSlider
        className="slider"
        thumbClassName="thumb"
        trackClassName="example-track"
        value={values}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        pearling
        onChange={setValues}
        minDistance={5}
        step={5}
      />
      <div className="mt-4">
        <span>
          Mức lương:{' '}
          {values[0] === 0 ? `${values[0]} vnđ` : `${values[0]}.000.000 vnđ`} -{' '}
          {values[1]}.000.000 vnđ
        </span>
      </div>
    </div>
  )
}

export default RangeSlider
