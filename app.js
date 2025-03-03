const express = require("express");
const cors = require("cors");
// const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const checkToken = require("./src/middleware/auth");
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

app.use("/auth", authRoutes);

//routes
app.get("/", (req, res) => {
  res.send("ВЕЛКУМ");
});

module.exports = app;
