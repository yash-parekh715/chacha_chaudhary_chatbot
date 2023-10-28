const express = require("express");
const { chat, dropBox } = require("../controllers/controllers");

const router = express.Router();

router.post("/chat", chat);
router.post("/dropBox", dropBox);

module.exports = router;
