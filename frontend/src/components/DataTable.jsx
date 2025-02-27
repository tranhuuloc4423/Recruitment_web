// DataTable.jsx
import React, { useEffect, useRef } from 'react'
import $ from 'jquery'
import 'datatables.net'
import 'datatables.net-dt/css/jquery.dataTables.css'
import './DataTable.css'

const DataTable = ({
  columns, // Array chứa thông tin các cột: [{ title: 'Tên', data: 'name' }, ...]
  data, // Array chứa dữ liệu
  options = {} // Các tùy chọn bổ sung cho DataTable
}) => {
  const tableRef = useRef(null)
  const dataTableRef = useRef(null)

  useEffect(() => {
    // Khởi tạo DataTable
    if (tableRef.current && !dataTableRef.current) {
      dataTableRef.current = $(tableRef.current).DataTable({
        data: data,
        columns: columns,
        destroy: true, // Cho phép khởi tạo lại
        language: {
          // Tùy chỉnh ngôn ngữ (có thể thay đổi sang tiếng Việt)
          lengthMenu: 'Hiển thị _MENU_ dòng mỗi trang',
          zeroRecords: 'Không tìm thấy dữ liệu',
          info: 'Hiển thị _START_ đến _END_ của _TOTAL_ dòng',
          infoEmpty: 'Hiển thị 0 đến 0 của 0 dòng',
          infoFiltered: '(lọc từ _MAX_ dòng)',
          search: 'Tìm kiếm:',
          paginate: {
            first: 'Đầu',
            last: 'Cuối',
            next: 'Tiếp',
            previous: 'Trước'
          }
        },
        ...options // Ghi đè các options mặc định bằng options từ props
      })
    }

    // Cleanup khi component unmount
    return () => {
      if (dataTableRef.current) {
        dataTableRef.current.destroy()
        dataTableRef.current = null
      }
    }
  }, [data, columns, options])

  return (
    <div className="data-table-container">
      <table ref={tableRef} className="display" style={{ width: '100%' }} />
    </div>
  )
}

export default DataTable
