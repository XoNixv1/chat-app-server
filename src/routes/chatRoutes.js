const { Router } = require("express");
const { getMessages } = require("../controllers/chatController");

const router = Router();

router.get("/messages", getMessages);

module.exports = router;
