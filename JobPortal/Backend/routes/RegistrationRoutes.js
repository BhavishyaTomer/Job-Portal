const express = require('express');
const { registerUser,loginUser } = require('../Controller/registrionController.js');
const singleUpload = require('../middleware/multer.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json("hello");
});

router.post('/',singleUpload,registerUser);
router.post('/login',loginUser)

module.exports = router;
