const convertToBase64 = (file) => {
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

export { convertToBase64, convertFileToURL }
