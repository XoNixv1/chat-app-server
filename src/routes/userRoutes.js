const { Router } = require("express");
const {
  addContact,
  getUser,
  changeImage,
  deleteContact,
} = require("../controllers/userController");
const router = Router();

router.post("/addUser", addContact);
router.post("/deleteContact", deleteContact);
router.get("/userData/:id", getUser);
router.post("/changeImage", changeImage);

module.exports = router;
