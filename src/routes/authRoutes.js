const { Router } = require("express");
const router = Router();
const path = require("path");

const { login, register } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../login.html"));
});

module.exports = router;
