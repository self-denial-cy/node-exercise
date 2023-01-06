const express = require('express');

// 路由模块化
const router = express.Router();

router.get('/list', (req, res) => {
  res.send([
    {
      id: 1,
      text: '项目1'
    },
    {
      id: 2,
      text: '项目2'
    },
    {
      id: 3,
      text: '项目3'
    }
  ]);
});

module.exports = router;
