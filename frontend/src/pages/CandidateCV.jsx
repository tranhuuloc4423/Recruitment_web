import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button, CVTheme_0, CVTheme_1 } from '../components'
import { getCandidate } from '../redux/api/app'

const CandidateCV = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [candidate, setCandidate] = useState()

  const getCandidateData = async () => {
    const res = await getCandidate(id)
    setCandidate(res)
  }
  useEffect(() => {
    getCandidateData()
  }, [])

  return (
    <div className='flex flex-col items-center'>
      {candidate && candidate?.themeCV?.themeId === 0 ? (
        <CVTheme_0 color={candidate?.themeCV?.color} data={candidate} />
      ) : (
        <CVTheme_1 color={candidate?.themeCV?.color} data={candidate} />
      )}
      <Button label={"Quay lại"} onClick={() => navigate(-1)}/>
    </div>
  )
}

export default CandidateCV
