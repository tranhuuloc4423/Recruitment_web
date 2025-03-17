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
import { getChartApplication } from '../redux/api/chart'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

const ChartApplication = () => {
  const [time, setTime] = useState(null)
  const [total, setTotal] = useState(null)
  const [activeTab, setActiveTab] = useState('monthly') // State để chuyển đổi tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChartApplication()
        setTime(res?.monthlyData)
        setTotal(res?.totalApplications)
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
        { name: 'Đã ứng tuyển', value: total.applied },
        { name: 'Đã được duyệt', value: total.approved }
      ]
    : []

  // Màu sắc cho PieChart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc107', '#74c0f3']

  // Xuất Excel cho BarChart
  const exportToExcel = () => {
    if (!time || !total) {
      toast.error('Không có dữ liệu để xuất.')
      return
    }

    const monthlyData = time.map((item) => ({
      'Thời gian': item.time,
      'Đã ứng tuyển': item.applied,
      'Đã được duyệt': item.approved,
      Tổng: item.total
    }))

    const totalData = [
      {
        'Trạng thái': 'Đã ứng tuyển',
        'Số lượng': total.applied,
        'Tỷ lệ': total.rate.applied
      },
      {
        'Trạng thái': 'Đã được duyệt',
        'Số lượng': total.approved,
        'Tỷ lệ': total.rate.approved
      }
    ]

    const workbook = XLSX.utils.book_new()

    const monthlyWorksheet = XLSX.utils.json_to_sheet(monthlyData)
    XLSX.utils.book_append_sheet(
      workbook,
      monthlyWorksheet,
      'Thống kê theo tháng'
    )

    const totalWorksheet = XLSX.utils.json_to_sheet(totalData)
    XLSX.utils.book_append_sheet(
      workbook,
      totalWorksheet,
      'Tổng quan lượt tuyển dụng'
    )
    XLSX.writeFile(workbook, 'ApplicationData.xlsx')
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center">
      {/* Tiêu đề và tab */}
      <div className="text-2xl font-semibold text-center">
        Thống kê lượt tuyển dụng
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <button
            onClick={() => setActiveTab('monthly')}
            className={`px-4 py-2 rounded ${
              activeTab === 'monthly'
                ? 'border-b border-primary text-primary'
                : 'text-gray-500'
            }`}
          >
            Thống kê theo tháng
          </button>
          <button
            label="Tổng quan"
            onClick={() => setActiveTab('total')}
            className={`px-4 py-2 rounded ${
              activeTab === 'total'
                ? 'border-b border-primary text-primary'
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
                <Bar dataKey="applied" fill="#8884d8" name="Đã ứng tuyển" />
                <Bar dataKey="approved" fill="#82ca9d" name="Đã được duyệt" />
                <Bar dataKey="total" fill="#ff7300" name="Tổng" />
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
            Tổng số lượt tuyển dụng: {total.total}
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
              'Lưu ý đây là dữ liệu thống kê lượt tuyển dụng trong 6 tháng gần nhất'
            }
            className={'justify-center'}
          />
        ) : (
          <Tip
            label={'Lưu ý đây là tổng quan toàn bộ số lượng lượt tuyển dụng trên hệ thống'}
            className={'justify-center'}
          />
        )}
      </div>
    </div>
  )
}

export default ChartApplication
