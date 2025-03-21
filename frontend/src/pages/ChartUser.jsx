import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'
import { Button, Dropdown, Tip } from '../components'
import * as XLSX from 'xlsx'
import { getChartUser } from '../redux/api/chart'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

const ChartUser = () => {
  const [time, setTime] = useState(null)
  const [total, setTotal] = useState(null)
  const [activeTab, setActiveTab] = useState('monthly') // State để chuyển đổi tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChartUser()
        setTime(res?.monthlyData)
        setTotal(res?.totalUsers)
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error)
      }
    }
    fetchData()
  }, [])

  const [selectedTime, setSelectedTime] = useState({
    value: 'all',
    name: 'Tất cả'
  })

  // Tạo timeOptions cho Dropdown
  const timeOptions = time
    ? [
        { value: 'all', name: 'Tất cả' },
        ...time.map((item) => ({ value: item.time, name: item.time }))
      ]
    : [{ value: 'all', name: 'Tất cả' }]

  // Lọc dữ liệu cho BarChart
  const filteredData =
    time && selectedTime.value === 'all'
      ? time
      : time?.filter((item) => item.time === selectedTime.value) || []

  // Dữ liệu cho PieChart từ totalUsers
  const pieData = total
    ? [
        { name: 'Admin', value: total.admin },
        { name: 'Ứng viên', value: total.candidate },
        { name: 'Nhà tuyển dụng', value: total.recruiter }
      ]
    : []

  const COLORS = ['#8884d8', '#82ca9d', '#ffc107']

const exportToExcel = () => {
  if (!time || !total) {
    toast.error('Không có dữ liệu để xuất.')
    return
  }

  const monthlyData = time.map(item => ({
    'Thời gian': item.time,
    'Admin': item.admin,
    'Ứng viên': item.candidate,
    'Nhà tuyển dụng': item.recruiter,
    'Tổng': item.total
  }))

  const totalData = [
    {
      'Vai trò': 'Quản trị',
      'Số lượng': total.admin,
      'Tỷ lệ': total.rate.admin
    },
    {
      'Vai trò': 'Ứng viên',
      'Số lượng': total.candidate,
      'Tỷ lệ': total.rate.candidate
    },
    {
      'Vai trò': 'Nhà tuyển dụng',
      'Số lượng': total.recruiter,
      'Tỷ lệ': total.rate.recruiter
    }
  ]

  const workbook = XLSX.utils.book_new()

  const monthlyWorksheet = XLSX.utils.json_to_sheet(monthlyData)
  XLSX.utils.book_append_sheet(workbook, monthlyWorksheet, 'MonthlyData')

  const totalWorksheet = XLSX.utils.json_to_sheet(totalData)
  XLSX.utils.book_append_sheet(workbook, totalWorksheet, 'TotalUsers')
  XLSX.writeFile(workbook, 'UserData.xlsx');
}

  return (
    <div className="w-full flex flex-col justify-center">
      {/* Tiêu đề và tab */}
      <div className="text-2xl font-semibold text-center">
        Thống kê người dùng
      </div>
      <div className="flex flex-col gap-4 lg:flex-row justify-between items-center my-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 ${
              activeTab === 'monthly'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500'
            }`}
          >
            Thống kê theo tháng
          </button>
          <button
            label="Tổng quan"
            onClick={() => setActiveTab('total')}
            className={`px-4 py-2 ${
              activeTab === 'total'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-500'
            }`}
          >
            Tổng quan
          </button>
        </div>

        {/* Dropdown và nút xuất Excel */}
        <div className="flex items-center gap-2">
          <span className="min-w-fit">Lọc theo tháng</span>
          <Dropdown
            options={timeOptions}
            label="Lọc theo tháng"
            setSelectedOption={setSelectedTime}
            selectedOption={selectedTime}
            className={'min-w-[120px]'}
          />
          <button
            onClick={exportToExcel}
            className="bg-green-500 min-w-fit text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Nội dung tab */}
      {activeTab === 'monthly' ? (
        <>
          {/* BarChart */}
          {time ? (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  type="monotone"
                  dataKey="admin"
                  fill="#8884d8"
                  name="Admin"
                />
                <Bar
                  type="monotone"
                  dataKey="candidate"
                  fill="#82ca9d"
                  name="Ứng viên"
                />
                <Bar
                  type="monotone"
                  dataKey="recruiter"
                  fill="#ffc107"
                  name="Nhà tuyển dụng"
                />
                <Bar
                  type="monotone"
                  dataKey="total"
                  fill="#ff7300"
                  name="Tổng"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center">
              <CircularProgress />
            </div>
          )}
        </>
      ) : /* PieChart */
      total ? (
        <div className="flex flex-col justify-center items-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(2)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-[#ff7300]">
            Tổng số người dùng: {total.total}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <CircularProgress />
        </div>
      )}

      {/* Ghi chú */}
      <div className="w-full mt-6">
        {activeTab === 'monthly' ? (
          <Tip
            label={
              'Lưu ý đây là dữ liệu thống kê người dùng trong 6 tháng gần nhất'
            }
            className={'justify-center'}
          />
        ) : (
          <Tip
            label={'Lưu ý đây là tổng quan toàn bộ số lượng người dùng trên hệ thống'}
            className={'justify-center'}
          />
        )}
      </div>
    </div>
  )
}

export default ChartUser
