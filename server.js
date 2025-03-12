const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const chatRoutes = require("./src/routes/chatRoutes");
const http = require("http");
const socketIo = require("socket.io");
const { setupSocket } = require("./src/socket/chatSocket");
const pool = require("./src/config/db");
const cookieParser = require("cookie-parser");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://chat-app-front-production.up.railway.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

app.locals.io = io;

io.on("connection", (socket) => {
  setupSocket(io, socket);
});

app.use(
  cors({
    origin: "https://chat-app-front-production.up.railway.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//auth routes
app.use("/api/auth", authRoutes);
//user routes
app.use("/api/user", userRoutes);
//chat routes
app.use("/api/chat", chatRoutes);

app.get("/healthcheck", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    res.status(200).json({ status: "ok", time: result.rows[0].now });
  } catch (err) {
    console.error("Healthcheck error:", err);
    res.status(500).json({ status: "error", error: err.message });
  }
});

//
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
