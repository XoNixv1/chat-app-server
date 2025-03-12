const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const queries = require("../queries/authQueries");
const { getContacts } = require("../queries/userQueries");
require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;

async function varifyToken(req, res) {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "required token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    const result = await pool.query(queries.findUserById, [decoded.id]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found", decoded });
    }
    const userContacts = await pool.query(getContacts, [decoded.id]);

    return res.status(200).json({
      message: "valid Token",
      currentUser: result.rows[0],
      userId: decoded.id,
      contacts: userContacts.rows,
    });
  } catch (error) {
    return res.status(401).json({ error: error.message || "Invalid token" });
  }
}

module.exports = varifyToken;
