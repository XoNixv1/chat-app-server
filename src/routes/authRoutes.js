const { Router } = require("express");
const router = Router();
const path = require("path");

const varifyToken = require("../middleware/auth");
const { login, register } = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.post("/varify", varifyToken);

module.exports = router;
