const express = require("express");
const { myChatbot } = require("../../controllers/chatbot/chatbot");

const router = express.Router();

router.post('/chat', myChatbot);

module.exports = router;
