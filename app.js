const express = require("express");
const cors = require("cors");
// const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const checkToken = require("./src/middleware/auth");
const coockieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(coockieParser());

app.use("/auth", authRoutes);

//routes
app.get("/chat", checkToken, (req, res) => {
  res.send("ВЕЛКУМ");
});

module.exports = app;
