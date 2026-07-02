require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const path = require("path");

const connectDB = require("./config/db");
const { initSocket } = require("./config/socket");
const { startQueue } = require("./workers/taskQueue");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
const server = http.createServer(app);

// Connect Database
connectDB();

// Initialize Socket.io
initSocket(server);

// Start Background Task Queue
startQueue();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Default API Route
app.get("/api", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to Blog API"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

// 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Global Error Handler
const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});