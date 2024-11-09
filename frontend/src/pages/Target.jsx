import React, { useState } from 'react'
import { Button, Filter } from '../components/'
import { updateTarget } from '../redux/api/app'
import { useDispatch, useSelector } from 'react-redux'

const Target = () => {
  const [skillSelected, setSkillSelected] = useState(null)
  const { currentRole, skillsDB } = useSelector((state) => state.app)
  const { address } = useSelector((state) => state.address)
  const dispatch = useDispatch()
  const [addressSelected, setAddressSelected] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([
    { name: 'Toàn thời gian', value: 'fulltime', checked: false },
    { name: 'Bán thời gian', value: 'parttime', checked: false },
    { name: 'Tại văn phòng', value: 'onsite', checked: false },
    { name: 'Từ xa', value: 'remote', checked: false },
    { name: 'Linh hoạt', value: 'hybrid', checked: false }
  ])

  const handleSubmit = () => {
    const types = tags
      .slice(0, 2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)
    const wforms = tags
      .slice(2)
      .filter((tag) => tag.checked)
      .map(({ checked, ...tag }) => tag)

    const data = {
      target: {
        skills: skills,
        target_money: {
          min_money: salarys[0],
          max_money: salarys[1]
        },
        types: types,
        address: address,
        wforms: wforms
      }
    }

    updateTarget(currentRole._id, data, dispatch)
    console.log(currentRole._id, data, dispatch)

    setSkills(skills)
    setSalarys(salarys)
    setTags(tags)
    setAddressSelected(address)
    console.log(data)
  }

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col p-4 rounded gap-2 w-2/3">
        {/* header */}
        <div className="flex flex-col gap-2">
          <span className="heading-2">Công việc mong muốn</span>
          <span className="para-1">
            Chia sẻ loại công việc bạn mong muốn để được giới thiệu cơ hội việc
            làm phù hợp hơn trên trang của chúng tôi.
          </span>
        </div>

        {/* content */}
        <Filter
          skillSelected={skillSelected}
          setSkillSelected={setSkillSelected}
          setSkills={setSkills}
          skills={skills}
          skillsStatic={skillsDB}
          addressStatic={address}
          addressSelected={addressSelected}
          setAddressSelected={setAddressSelected}
          tags={tags}
          setTags={setTags}
          salarys={salarys}
          setSalarys={setSalarys}
        />

        {/* footer */}
        <div className="w-full">
          <Button label={'Cập nhật'} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Target
