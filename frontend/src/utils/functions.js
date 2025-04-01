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
  if (!date) return '';

  // Kiểm tra định dạng input
  let parts;
  if (date.includes('-')) {
    // yyyy-mm-dd
    parts = date.split('-');
    if (parts.length !== 3) return date;
    const [year, month, day] = parts;
    return format === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}/${month}/${day}`;
  } else if (date.includes('/')) {
    // dd/mm/yyyy
    parts = date.split('/');
    if (parts.length !== 3) return date;
    const [day, month, year] = parts;
    return format === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}/${month}/${day}`;
  }
  return date;
};



const formatPhone = (phoneStr) => {
  if (!phoneStr) return '';
  const digits = phoneStr.replace(/[\s\.\-]/g, '');
  const formattedDigits = digits.length === 11 ? digits.slice(1) : digits;
  if (formattedDigits.length !== 10) return phoneStr;
  return `${formattedDigits.slice(0, 4)}.${formattedDigits.slice(4, 7)}.${formattedDigits.slice(7)}`;
};

const formatDateIso = (isoString) => {
  console.log(typeof isoString)
  const year = isoString?.slice(0, 4);
  const month = isoString?.slice(5, 7) // Tháng trong JS bắt đầu từ 0
  const day = isoString?.slice(8, 10);
  return `${day}/${month}/${year}`;
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
        <div className="flex flex-wrap items-center gap-2 py-2 flex-1">
          <span>{item?.icon}</span>
          <span className='break-all'>
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
    <div key={index} className={`flex flex-col`}>
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
                  className="flex items-center"
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

const stripHtml = (html) => {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ''); // Removes all HTML tags
};

const htmlToText = (htmlString) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  const addClassToElements = (htmlString, className) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(htmlString, 'text/html')

    // Lặp qua tất cả các phần tử con và thêm class
    doc.body.querySelectorAll('*').forEach((el) => {
      el.classList.add(...className.split(' '))
    })

    return doc.body.innerHTML
  }

  const formatSalary = (salary) => {
    return new Intl.NumberFormat('de-DE').format(salary)
  }

  
export {
  convertFile,
  convertFileToURL,
  convertFiles,
  formatDate,
  formatPhone,
  convertStringtoDate,
  convertDatetoString,
  renderBasicCV,
  renderOtherCV,
  stripHtml,
  formatDateIso,
  htmlToText,
  addClassToElements,
  formatSalary
}
