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
import { getChartPost } from '../redux/api/chart'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

const ChartPost = () => {
  const [time, setTime] = useState(null)
  const [total, setTotal] = useState(null)
  const [activeTab, setActiveTab] = useState('monthly') // State để chuyển đổi tab

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getChartPost()
        setTime(res?.monthlyData)
        setTotal(res?.totalPosts)
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
        { name: 'Đã đăng', value: total.posted },
        { name: 'Đã duyệt', value: total.confirmed },
        { name: 'Hết hạn', value: total.expired },
        { name: 'Bị từ chối', value: total.cancelled }
      ]
    : []

  // Màu sắc cho PieChart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc107', '#74c0f3']

  // Xuất Excel cho BarChart
  const exportToExcel = () => {
    let dataExport = null
    const totalFormat = [
      {
        'Trạng thái': 'Đã đăng',
        'Số lượng': total.posted,
        'Tỷ lệ': total.rate.posted
      },
      {
        'Trạng thái': 'Đã duyệt',
        'Số lượng': total.confirmed,
        'Tỷ lệ': total.rate.confirmed
      },
      {
        'Trạng thái': 'Hết hạn',
        'Số lượng': total.expired,
        'Tỷ lệ': total.rate.expired
      },
      {
        'Trạng thái': 'Bị từ chối',
        'Số lượng': total.cancelled,
        'Tỷ lệ': total.rate.cancelled
      },
    ];
    if (activeTab === 'monthly') {
      dataExport = filteredData
    } else {
      dataExport = totalFormat
    }

    
    if (dataExport === null) {
      toast.error('Không có dữ liệu để xuất.')
      return
    }
    const worksheet = XLSX.utils.json_to_sheet(dataExport)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'UserStatistics')
    XLSX.writeFile(workbook, `${selectedTime.name}.xlsx`)
  }

  return (
    <div className="w-full p-4 flex flex-col justify-center">
      {/* Tiêu đề và tab */}
      <div className="text-2xl font-semibold text-center">
        Thống kê Bài tuyển dụng
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
          {activeTab === 'monthly' && (
            <>
              <span className="min-w-fit">Lọc theo tháng</span>
              <Dropdown
                options={timeOptions}
                label="Lọc theo tháng"
                setSelectedOption={setSelectedTime}
                selectedOption={selectedTime}
                className={'min-w-[120px]'}
              />
            </>
          )}
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
              <LineChart
                data={filteredData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  dataKey="posted"
                  stroke="#8884d8"
                  name="Đã đăng"
                  strokeWidth={5}
                />
                <Line
                  dataKey="confirmed"
                  stroke="#82ca9d"
                  name="Đã duyệt"
                  strokeWidth={5}
                />
                <Line
                  dataKey="expired"
                  stroke="#ffc107"
                  name="Hết hạn"
                  strokeWidth={5}
                />
                <Line
                  dataKey="cancelled"
                  stroke="#74c0f3"
                  name="Bị từ chối"
                  strokeWidth={5}
                />
                <Line
                  dataKey="total"
                  stroke="#ff7300"
                  name="Tổng"
                  strokeWidth={5}
                />
              </LineChart>
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
            Tổng số bài tuyển dụng: {total.total}
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
              'Lưu ý đây là dữ liệu thống kê bài tuyển dụng trong 6 tháng gần nhất'
            }
            className={'justify-center'}
          />
        ) : (
          <Tip
            label={'Lưu ý đây là tổng quan số lượng bài tuyển dụng'}
            className={'justify-center'}
          />
        )}
      </div>
    </div>
  )
}

export default ChartPost
