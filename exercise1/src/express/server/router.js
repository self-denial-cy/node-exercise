const express = require('express');

const router = express.Router();

router.get('/get', (req, res) => {
  const query = req.query;
  res.send({
    ret: 1,
    msg: 1,
    data: query
  });
});

router.post('/post', (req, res) => {
  const body = req.body;
  res.send({
    ret: 1,
    msg: 1,
    data: body
  });
});

module.exports = router;
