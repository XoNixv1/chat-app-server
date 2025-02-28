const bcrypt = require("bcryptjs");
const queries = require("./authQueries");
const pool = require("../config/db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(queries.findUser, [email]);

    if (result.rows.length === 0) {
      return res.status(400).send("no such user");
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "wrong password" });
    }

    // const token = jwt.sign({ id: user.id, email: user.email }, "secretKey", {
    //   expiresIn: "1h",
    // });
    res.json({ message: "success" }); // token
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await pool.query(queries.checkEmailExists, [email]);

    if (user.rows.length > 0) {
      return res.status(409).send("Email already exists");
    }

    const hashedPass = await bcrypt.hash(password, 10);

    await pool.query(queries.newUser, [
      name,
      email,
      hashedPass,
      "https://cdn-icons-png.flaticon.com/512/149/149452.png",
    ]);

    res.status(201).json({ message: "user created succesfully", email });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
