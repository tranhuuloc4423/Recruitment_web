import React, { useState } from 'react'
import { Button, Filter } from '../components/'
import { updateTarget } from '../redux/api/app'
import { useDispatch, useSelector } from 'react-redux'

const Target = () => {
  const [skillSelected, setSkillSelected] = useState(null)
  const { currentRole } = useSelector((state) => state.app)
  const dispatch = useDispatch()
  const [address, setAddress] = useState(null)
  const [salarys, setSalarys] = useState([0, 100])
  const [skills, setSkills] = useState([])
  const [tags, setTags] = useState([
    { label: 'Toàn thời gian', value: 'fulltime', checked: false },
    { label: 'Bán thời gian', value: 'parttime', checked: false },
    { label: 'Tại văn phòng', value: 'onsite', checked: false },
    { label: 'Từ xa', value: 'remote', checked: false },
    { label: 'Linh hoạt', value: 'hybrid', checked: false }
  ])
  const skillsstatic = [
    { value: 'reactjs', label: 'ReactJS' },
    { value: 'vuejs', label: 'VueJS' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'angular', label: 'Angular' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ]
  const addressstatic = [
    { value: 'hochiminh', label: 'Tp Hồ Chí Minh' },
    { value: 'hanoi', label: 'Hà Nội' },
    { value: 'binhduong', label: 'Bình Dương' },
    { value: 'dongnai', label: 'Đồng Nai' }
  ]

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
    setAddress(address)
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
          skillsstatic={skillsstatic}
          addressstatic={addressstatic}
          address={address}
          setAddress={setAddress}
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
