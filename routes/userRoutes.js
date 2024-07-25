// routes/userRoutes.js
const express = require('express');
const { handleCreateNewUser, handleToFindUser } = require('../controllers/user');

const router = express.Router();

router.post('/signup', handleCreateNewUser);
router.post('/login', handleToFindUser);

module.exports = router;
