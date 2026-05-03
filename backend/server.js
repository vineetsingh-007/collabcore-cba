const cors = require("cors");
const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Middleware - CORS configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:5007", "http://frontend:8080", "*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.io setup with CORS
const io = new Server(server, {
  cors: corsOptions
});

io.on("connection", (socket) => {
  console.log("🔌 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Routes (IMPORTANT: all prefixed with /api)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/notifications', require('./routes/notifications'));

// Health check route
app.get('/', (req, res) => {
  res.send('🚀 Collab Canvas API is running');
});

// Error handler (optional but useful)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start server
const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});