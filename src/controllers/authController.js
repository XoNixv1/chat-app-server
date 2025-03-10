const bcrypt = require("bcryptjs");
const queries = require("../queries/authQueries");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const { addContactService } = require("../services/addContactService");
require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(queries.findUser, [email]);

    if (result.rows.length === 0) {
      return res.status(400).json("no such user");
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "wrong password" });
    }

    const token = jwt.sign({ id: user.id }, jwtKey, {
      expiresIn: "12h",
    });

    return res
      .status(200)
      .json({ message: "Login successful", token, id: user.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;
  console.log(req.body);
  try {
    const user = await pool.query(queries.checkEmailExists, [email]);

    if (user.rows.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await pool.query(queries.newUser, [
      userName,
      email,
      hashedPass,
      "https://cdn.iconscout.com/icon/free/png-256/free-account-icon-download-in-svg-png-gif-file-formats--profile-user-avatar-travel-pack-holidays-icons-1538680.png?f=webp",
    ]);

    const newUserIdRows = await pool.query(queries.getUserId, [email]);
    const { id } = newUserIdRows.rows[0];

    const addingGpt = await addContactService({
      user1_id: id,
      email: "@chatgpt.com",
    });
    console.log(addingGpt);

    res.status(201).json({ message: "user created succesfully", email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
