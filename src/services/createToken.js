const jwt = require("jsonwebtoken");

const jwtKey = process.env.JWT_SECRET;

const createToken = (id) => {
  const token = jwt.sign({ id: id }, jwtKey, {
    expiresIn: "12h",
  });
  return token;
};

module.exports = { createToken };
