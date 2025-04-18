require('dotenv').config()
const http = require('http')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const app = require('./app')

const PORT = process.env.PORT || 8080
const MONGODB_URI = process.env.MONGODB_URI

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const usersOnline = {}

// Socket.io event handlers
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('userConnected', (username) => {
    usersOnline[socket.id] = username
    io.emit('updateUserList', Object.values(usersOnline))
  })

  socket.on('joinRoom', (room) => {
    socket.join(room)
  })

  socket.on('sendMessage', async (msgData) => {
    // TODO: sau này lưu msgData vào MongoDB ở đây
    const receiverSocketId = Object.keys(usersOnline).find(
      (key) => usersOnline[key] === msgData.receiver
    )

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', msgData)
    }
    // gửi lại cho chính sender để cập nhật UI
    socket.emit('receiveMessage', msgData)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    delete usersOnline[socket.id]
    io.emit('updateUserList', Object.values(usersOnline))
  })
})

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    server.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    )
  })
  .catch((err) => console.error('MongoDB connection error:', err))
