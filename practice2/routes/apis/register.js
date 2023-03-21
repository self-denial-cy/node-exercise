const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { register } = require('../../controllers/register');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const targetDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    cb(null, targetDir);
  },
  filename: (req, file, cb) => {
    const uniqueKey = '' + Date.now() + Math.round(Math.random() * 1e9);
    const mimetype = file.mimetype;
    const suffix = mimetype.substring(mimetype.lastIndexOf('/') + 1);
    cb(null, `${uniqueKey}.${suffix}`);
  }
});
const upload = multer({ storage });

router.post('/register', upload.single('avatar'), register);

module.exports = router;
