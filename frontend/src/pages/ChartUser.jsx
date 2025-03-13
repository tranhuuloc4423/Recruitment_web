import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import { Button, Dropdown } from '../components'
import * as XLSX from 'xlsx'

const ChartUser = () => {
  const data = [
    { month: '10-2024', admin: 0, candidate: 0, recruiter: 0, total: 0 },
    { month: '11-2024', admin: 1, candidate: 0, recruiter: 1, total: 2 },
    { month: '12-2024', admin: 0, candidate: 1, recruiter: 0, total: 1 },
    { month: '01-2025', admin: 0, candidate: 6, recruiter: 0, total: 6 },
    { month: '02-2025', admin: 0, candidate: 2, recruiter: 0, total: 2 },
    { month: '03-2025', admin: 0, candidate: 3, recruiter: 1, total: 4 }
  ]

  // State để quản lý tháng được chọn
  const [selectedMonth, setSelectedMonth] = useState({
    value: 'all',
    name: 'Tất cả'
  })

  // Lấy danh sách tháng duy nhất từ dữ liệu để làm option cho Dropdown
  const monthOptions = [
    { value: 'all', name: 'Tất cả' },
    ...data.map((item) => ({ value: item.month, name: item.month }))
  ]

  // Lọc dữ liệu dựa trên tháng được chọn
  const filteredData =
    selectedMonth.value === 'all'
      ? data
      : data.filter((item) => item.month === selectedMonth.value)

  // Hàm xuất dữ liệu sang Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'NameSheet')
    XLSX.writeFile(workbook, `${selectedMonth.name}.xlsx`)
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center">
      {/* Tiêu đề và dropdown lọc */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-semibold">Thống kê người dùng</div>
        <div className="flex items-center gap-2 w-1/4">
          <span className="min-w-fit">Lọc theo tháng</span>
          <Dropdown
              options={monthOptions}
              label="Lọc theo tháng"
              setSelectedOption={setSelectedMonth}
              selectedOption={selectedMonth}
            />
          <Button
            label={'Xuất Excel'}
            onClick={exportToExcel}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          />
        </div>
      </div>

      {/* Biểu đồ */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={filteredData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="admin" fill="#8884d8" name="Admin" />
          <Bar dataKey="candidate" fill="#82ca9d" name="Ứng viên" />
          <Bar dataKey="recruiter" fill="#ffc107" name="Nhà tuyển dụng" />
          <Bar dataKey="total" fill="#ff7300" name="Tổng" />
        </BarChart>
      </ResponsiveContainer>

      <div className="text-center mt-6">
        Lưu ý đây là dữ liệu thống kê người dùng trong 6 tháng gần nhất
      </div>
    </div>
  )
}

export default ChartUser
