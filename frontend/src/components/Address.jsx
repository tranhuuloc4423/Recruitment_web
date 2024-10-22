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

  // UseEffect để lấy danh sách thành phố khi selectedProvince thay đổi
  useEffect(() => {
    if (selectedProvince) {
      setCities(selectedProvince.districts || [])

      setSelectedCity(null)
    } else if (selectedProvince?.districts === null) {
      setCities([])
      setSelectedCity(null)
    }
  }, [selectedProvince])

  return (
    <div className="flex flex-row justify-between w-full gap-4">
      <DropdownSearch
        items={provinces}
        selectedItem={selectedProvince}
        setSelectedItem={setSelectedProvince}
        label="Chọn tỉnh"
        required
      />

      <DropdownSearch
        items={cities}
        selectedItem={selectedCity}
        setSelectedItem={setSelectedCity}
        label="Chọn thành phố"
        required
        disabled={selectedProvince === null}
      />
    </div>
  )
}

export default Address
