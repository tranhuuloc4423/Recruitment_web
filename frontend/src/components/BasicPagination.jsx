import { useState } from 'react'
import Pagination from '@mui/material/Pagination'

const BasicPagination = ({ length }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
  }
  return (
    <div className="w-full flex justify-center py-4">
      <Pagination
        count={length}
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#fbc73b',
            color: '#000'
          }
        }}
        size="large"
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default BasicPagination
