const { Router } = require("express");
const {
  addContact,
  getUser,
  changeImage,
} = require("../controllers/userController");
const router = Router();

router.post("/addUser", addContact);
router.get("/userData", getUser);
router.post("/changeImage", changeImage);

module.exports = router;
