const jwt = require("jsonwebtoken");
const pool = require("../config/db");
const queries = require("../queries/authQueries");
require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;

async function varifyToken(req, res) {
  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.slice(7);
  }

  if (!token) {
    return res.status(401).json({ message: "required token missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    const result = await pool.query(queries.findUserById, [decoded.id]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found", decoded });
    }

    return res.status(200).json({ message: "valid Token" });
  } catch (error) {
    return res.status(401).json({ error: error.message || "Invalid token" });
  }
}

module.exports = varifyToken;
