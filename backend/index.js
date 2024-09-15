const express = require('express')
const mongoose = require('mongoose')

// Tạo ứng dụng Express
const app = express()
const PORT = process.env.PORT || 3000

// Kết nối đến MongoDB
mongoose
    .connect('mongodb://localhost:27017/mydatabase', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Đã kết nối đến MongoDB')
    })
    .catch((err) => {
        console.error('Lỗi kết nối MongoDB:', err)
    })

// Middleware để phân tích JSON
app.use(express.json())

// Tạo một API mẫu
app.get('/', (req, res) => {
    res.send('Chào mừng đến với API của tôi!')
})

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`)
})
