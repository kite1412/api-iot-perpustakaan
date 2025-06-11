const express = require('express');
const router = express.Router();

const { registerHandler, loginHandler } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// router.use(authMiddleware);

router.post('/register', registerHandler);
router.post('/login', loginHandler);

module.exports = router;
