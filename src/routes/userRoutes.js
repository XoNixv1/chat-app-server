const { Router } = require("express");
const { addContact, getUser } = require("../controllers/userController");
const router = Router();

router.post("/addUser", addContact);
//
router.get("/userData/", getUser);

module.exports = router;
