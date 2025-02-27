// BasicPagination.jsx
import React from 'react';
import Pagination from '@mui/material/Pagination';

const BasicPagination = ({ length, currentPage, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <div className="w-full flex justify-center py-4">
      <Pagination
        count={length}
        page={currentPage}
        onChange={handleChange}
        sx={{
          '& .Mui-selected': {
            backgroundColor: '#fbc73b',
            color: '#000',
          },
        }}
        size="large"
      />
    </div>
  );
};

export default BasicPagination;