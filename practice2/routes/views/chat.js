const express = require('express');
const router = express.Router();

router.get('/chat-ws', (req, res) => {
  res.render('chat-ws');
});

router.get('/chat-socket-io', (req, res) => {
  res.render('chat-socket-io');
});

module.exports = router;
