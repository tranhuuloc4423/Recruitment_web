import dayjs from 'dayjs'

const convertFile = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

const convertFiles = (files) => {
  return Promise.all(
    Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
          resolve(fileReader.result) // Trả về kết quả là base64
        }
        fileReader.onerror = (error) => {
          reject(error) // Bắt lỗi nếu có
        }
      })
    })
  )
}

const convertFileToURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      resolve(reader.result) // Trả về Data URL
    }

    reader.onerror = () => {
      reject(new Error('Failed to read file')) // Xử lý lỗi
    }

    reader.readAsDataURL(file) // Đọc file như một Data URL
  })
}

const formatDate = (date, format = 'dd/mm/yyyy') => {
  const [day, month, year] = date?.split('/')
  if (format === 'dd/mm/yyyy') {
    return `${day}/${month}/${year}`
  } else {
    return `${year}/${month}/${day}`
  }
}

const convertDatetoString = (date) => {
  return `${date.$D}/${date.$M + 1}/${date.$y}`
}

const convertStringtoDate = (string) => {
  return dayjs(string, 'DD/MM/YYYY')
}

const renderBasicCV = (items, currentRole) => {
  return items?.map((item, index) => (
    <div key={index}>
      {item?.icon && (
        <div className="flex items-center gap-2 py-2 flex-1">
          <span>{item?.icon}</span>
          <span>
            {item?.name === 'gender'
              ? currentRole?.basic_info[item?.name]?.name
              : currentRole?.basic_info[item?.name]}
          </span>
        </div>
      )}
    </div>
  ))
}
const renderOtherCV = (items, currentRole, options = {}) => {
  const { lineComponent = null, color } = options

  return items?.map((item, index) => (
    <div key={index} className={`flex flex-col gap-4`}>
      <div className="flex flex-col items-start justify-between">
        <span className={`text-xl font-semibold uppercase`} style={{ color }}>
          {item?.title}
        </span>
        <div className="flex-1">
          {item?.name === 'skills' ? (
            <div>
              {currentRole?.other_info?.[item?.name]?.map((skill) => (
                <div
                  key={skill?.value}
                  className="flex items-center gap-2 py-2"
                >
                  <span>{skill?.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: currentRole?.other_info?.[item?.name]
              }}
            ></div>
          )}
        </div>
      </div>
      {index !== items.length - 1 && lineComponent}
    </div>
  ))
}

export {
  convertFile,
  convertFileToURL,
  convertFiles,
  formatDate,
  convertStringtoDate,
  convertDatetoString,
  renderBasicCV,
  renderOtherCV
}
