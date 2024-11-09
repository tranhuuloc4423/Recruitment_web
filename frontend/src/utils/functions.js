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

export { convertFile, convertFileToURL, convertFiles, formatDate }
