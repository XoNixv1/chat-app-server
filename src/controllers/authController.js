const bcrypt = require("bcryptjs");
const queries = require("../queries/authQueries");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign({ id: user.id }, "test-key", {
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
      "https://png.pngtree.com/element_our/20190529/ourmid/pngtree-user-icon-image_1187018.jpg",
    ]);

    res.status(201).json({ message: "user created succesfully", email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
