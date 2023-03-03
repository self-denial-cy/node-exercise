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

// 匹配 /acd 和 /abcd
router.get('/ab?cd', (req, res) => {});

// 匹配 /ab/******
router.get('/ab/:id', (req, res) => {});

// 匹配 /abcd /abbcd /abbbcd 等
router.get('/ab+cd', (req, res) => {});

// 匹配 /abcd /abxcd /abRABDOMcd /ab123cd 等
router.get('/ab*cd', (req, res) => {});

// 匹配 /abe 和 /abcde
router.get('/ab(cd)?e', (req, res) => {});

// 路由路径还可以使用正则表达式进行匹配
router.get(/a/, (req, res) => {}); // 匹配任何路径中包含 a 的路由
router.get(/.*fly$/, (req, res) => {}); // 匹配 butterfly、dragonfly 等以 fly 结尾的路由

module.exports = router;
