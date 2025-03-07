const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const http = require("http");
const coockieParser = require("cookie-parser");
const socketIo = require("socket.io");
const { setupSocket } = require("./src/socket/chatSocket");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

io.on("connection", (socket) => {
  setupSocket(io, socket);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(coockieParser());

//auth routes
app.use("/api/auth", authRoutes);
//user routes
app.use("/api/user", userRoutes);
//chat routes
app.use("/api/chat", chatRoutes);

//
const port = 3001;
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
