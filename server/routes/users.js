const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../utils/cloudinary');
const upload = multer({ storage });
const { updateAvatar } = require('../controllers/userController');
const  verifyToken  = require('../middleware/auth');

// PATCH /api/users/avatar/:id
router.patch('/avatar/:id', verifyToken, upload.single('avatar'), updateAvatar);

module.exports = router;
