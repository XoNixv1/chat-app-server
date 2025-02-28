const express = require("express");
const cors = require("cors");
// const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

//routes
app.get("/", (req, res) => {
  res.send("server running");
});

module.exports = app;
