const express = require("express");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const coockieParser = require("cookie-parser");

const app = express();

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

module.exports = app;
