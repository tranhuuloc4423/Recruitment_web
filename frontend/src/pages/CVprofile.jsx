import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import cv_t_0 from '../assets/imgs/cv_template_0.png'
import cv_t_1 from '../assets/imgs/cv_template_1.png'
import { FaCheck } from 'react-icons/fa6'
import Button from '../components/Button'
import { FiDownload } from 'react-icons/fi'
import CVTheme_0 from '../components/CVTheme_0'
import CVTheme_1 from '../components/CVTheme_1'
import { PDFDownloadLink } from '@react-pdf/renderer'
import CVTheme_0_PDF from '../components/CVTheme_0_PDF'
import CVTheme_1_PDF from '../components/CVTheme_1_pdf'
import info from '../utils/infos'
import { updateTheme } from '../redux/api/app'
const CVprofile = () => {
  const { currentRole } = useSelector((state) => state.app)
  const [otherInfo, setOtherInfo] = useState([])
  const [basicInfo, setBasicInfo] = useState([])

  useEffect(() => {
    let renderInfo = info.find((item) => item?.name === 'candidate')
    setBasicInfo(renderInfo?.basicInfo)
    setOtherInfo(renderInfo?.otherInfo)
  }, [])
  const [themeState, setThemeState] = useState({
    activeTheme: 0,
    activeColor: 0,
    themes: [
      {
        color: ['#383d44', '#0e3850']
      },
      {
        color: ['#ea1e30', '#121212', '#0a3e7a']
      }
    ]
  })
  const cvRef = useRef(null)

  const getPDFDocument = () => {
    if (currentRole.profileStatus !== 100) {
      return null // Không tạo PDF nếu profile chưa hoàn thiện
    }
    return themeState.activeTheme === 0 ? (
      <CVTheme_0_PDF
        color={activeColor}
        currentRole={currentRole}
        basicInfo={basicInfo}
        otherInfo={otherInfo}
      />
    ) : (
      <CVTheme_1_PDF
        color={activeColor}
        currentRole={currentRole}
        basicInfo={basicInfo}
        otherInfo={otherInfo}
      />
    )
  }

  // const handleThemeChange = (themeIndex) => {
  //   setThemeState((prevState) => ({
  //     ...prevState,
  //     activeTheme: themeIndex,
  //     activeColor: 0 // Reset màu khi đổi theme
  //   }))
  // }
  // Hàm để thay đổi màu hiện tại
  // const handleColorChange = (colorIndex) => {
  //   setThemeState((prevState) => ({
  //     ...prevState,
  //     activeColor: colorIndex
  //   }))
  // }

  const handleThemeAndColorChange = async (
    themeIndex = themeState.activeTheme,
    colorIndex = themeState.activeColor
  ) => {
    setThemeState((prevState) => ({
      ...prevState,
      activeTheme: themeIndex,
      activeColor: colorIndex
    }))

    const color = themeState.themes[themeIndex]
    const theme = {
      themeId: themeState.activeTheme,
      color: color.color[colorIndex]
    }
    await updateTheme(theme, currentRole?._id)
  }

  const activeTheme = themeState.themes[themeState.activeTheme]
  const activeColor = activeTheme.color[themeState.activeColor]

  return (
    <div className="flex flex-col xl:flex-row items-start">
      <div className="flex flex-col w-full xl:w-1/3">
        <div>Chọn theme mẫu</div>
        <div className="flex flex-row items-center w-full px-8 justify-center xl:p-0 gap-4">
          {themeState?.themes.map((theme, index) => (
            <div
              key={index}
              className={`w-1/2 cursor-pointer relative ${
                themeState.activeTheme === index ? 'border-second border-4' : ''
              }`}
              onClick={() => handleThemeAndColorChange(index, 0)}
            >
              <img
                src={index === 0 ? cv_t_0 : cv_t_1}
                alt=""
                className="w-full"
              />
              {themeState.activeTheme === index && (
                <span className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-3 bg-second rounded-full">
                  <FaCheck size={48} color="white" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div ref={cvRef} className="w-full xl:w-2/3 flex flex-col items-center gap-8">
        {/* Theme zone */}
        {/* overflow-y-auto h-[600px] */}
        {themeState.activeTheme === 0 ? (
            currentRole.profileStatus === 100 ? (
              <>
                <CVTheme_0 color={activeColor} />
              </>
            ) : (
              <img src={cv_t_0} />
            )
          ) : currentRole.profileStatus === 100 ? (
            <>
              <CVTheme_1 color={activeColor} />
            </>
          ) : (
            <img src={cv_t_1} />
          )}
        <div className="flex flex-row items-center justify-between w-full bg-black-100 text-white p-4 rounded">
          <div className="flex flex-row gap-4 items-center">
            <span>Màu sắc : </span>
            <div className="flex items-center gap-2">
              {activeTheme?.color?.map((color, index) => (
                <span
                  key={index}
                  className={`w-8 h-8 flex justify-center items-center cursor-pointer rounded-full border border-white ${
                    index === themeState.activeColor ? 'border-2' : ''
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    handleThemeAndColorChange(themeState.activeTheme, index)
                  }
                >
                  {index === themeState.activeColor && <FaCheck size={16} />}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="">Hoàn thiện hồ sơ để tải CV</span>

            {currentRole.profileStatus === 100 && (
              <PDFDownloadLink
                document={getPDFDocument()}
                fileName={`cv_theme_${themeState.activeTheme}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    'Đang tạo PDF...'
                  ) : (
                    <Button
                      label={'Tải CV'}
                      iconPosition="left"
                      icon={<FiDownload color="white" size={24} />}
                    />
                  )
                }
              </PDFDownloadLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVprofile
