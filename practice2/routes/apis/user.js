const express = require('express');
const router = express.Router();
const { update, del, list } = require('../../controllers/user');

router.put('/user/:id', update);

router.delete('/user/:id', del);

router.get('/user/list', list);

module.exports = router;
