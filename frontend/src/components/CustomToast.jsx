import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component CustomConfirmToast
const CustomConfirmToast = ({ message, onYes, onNo, closeToast }) => {
  const handleYes = () => {
    if (onYes) onYes(); // Gọi hàm xử lý Yes nếu được cung cấp
    closeToast(); // Đóng toast
  };

  const handleNo = () => {
    if (onNo) onNo(); // Gọi hàm xử lý No nếu được cung cấp
    closeToast(); // Đóng toast
  };

  return (
    <div style={{ padding: '10px' }}>
      <p style={{ marginBottom: '10px' }}>{message}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleYes}
          style={{
            padding: '5px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Yes
        </button>
        <button
          onClick={handleNo}
          style={{
            padding: '5px 15px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

// Hàm helper để hiển thị toast
export const showConfirmToast = ({
  message = 'Bạn có chắc chắn không?',
  onYes,
  onNo,
  options = {},
}) => {
  toast(
    <CustomConfirmToast message={message} onYes={onYes} onNo={onNo} />,
    {
      position: 'top-center',
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      ...options, // Ghi đè hoặc thêm các tùy chọn khác nếu cần
    }
  );
};

// Ví dụ sử dụng trong một component khác
const CustomToast = () => {
  const handleConfirmDelete = () => {
    showConfirmToast({
      message: 'Bạn có chắc chắn muốn xóa mục này không?',
      onYes: () => {
        console.log('Đã xóa!');
        // Thêm logic xóa ở đây
      },
      onNo: () => {
        console.log('Hủy bỏ!');
        // Thêm logic hủy ở đây
      },
    });
  };

  return (
    <div>
      <button onClick={handleConfirmDelete}>Xóa mục</button>
      {/* Đừng quên thêm <ToastContainer /> ở root component */}
    </div>
  );
};

export default CustomToast;