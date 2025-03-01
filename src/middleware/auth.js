const jwt = require("jsonwebtoken");

function varifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect("/auth/login");
  }

  try {
    const decoded = jwt.verify(token, "test-key");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.redirect("/auth/login");
  }
}

module.exports = varifyToken;
