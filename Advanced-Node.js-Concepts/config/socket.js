const jwt = require("jsonwebtoken");

let io;

const initSocket = (server) => {
    const { Server } = require("socket.io");
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    // JWT authentication middleware for Socket.io
    io.use((socket, next) => {
        let token = socket.handshake.auth?.token || socket.handshake.query?.token;

        if (!token) {
            const authHeader = socket.handshake.headers?.authorization;
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.split(" ")[1];
            }
        }

        if (!token) {
            return next(new Error("Authentication error: No token provided."));
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded; // Attach user payload to the socket
            next();
        } catch (err) {
            return next(new Error("Authentication error: Invalid or expired token."));
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket client connected: ${socket.id} (User ID: ${socket.user.id})`);

        // Join room for a specific blog
        socket.on("joinBlog", (blogId) => {
            if (!blogId) return;
            const roomName = `blog:${blogId}`;
            socket.join(roomName);
            console.log(`Socket ${socket.id} joined room ${roomName}`);
        });

        // Leave room for a specific blog
        socket.on("leaveBlog", (blogId) => {
            if (!blogId) return;
            const roomName = `blog:${blogId}`;
            socket.leave(roomName);
            console.log(`Socket ${socket.id} left room ${roomName}`);
        });

        socket.on("disconnect", () => {
            console.log(`Socket client disconnected: ${socket.id}`);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io has not been initialized!");
    }
    return io;
};

module.exports = {
    initSocket,
    getIO,
};
