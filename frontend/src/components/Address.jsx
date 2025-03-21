import React, { useEffect, useState } from 'react'
import DropdownSearch from './DropdownSearch'

const Address = ({
  provincesData,
  selectedProvince,
  selectedCity,
  setSelectedProvince,
  setSelectedCity
}) => {
  const [provinces, setProvinces] = useState(provincesData || [])
  const [cities, setCities] = useState([])

  useEffect(() => {
    console.log(selectedProvince)
    console.log(provincesData)
    if (selectedProvince && selectedCity == null) {
      setCities(selectedProvince.districts || [])

      setSelectedCity(null)
    } else if (selectedProvince?.districts === null) {
      setCities([])
      setSelectedCity(null)
    } else if(selectedProvince && selectedCity) {
      setCities(provincesData.find((province) => province.code === selectedProvince.code).districts)
    }
  }, [selectedProvince, selectedCity])

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-4">
      <DropdownSearch
        items={provinces}
        selectedItem={selectedProvince}
        setSelectedItem={setSelectedProvince}
        label="Chọn Tỉnh/thành phố"
        required
      />

      <DropdownSearch
        items={cities}
        selectedItem={selectedCity}
        setSelectedItem={setSelectedCity}
        label="Chọn Quận/huyện/thành phố"
        required
        disabled={selectedProvince === null}
      />
    </div>
  )
}

export default Address
