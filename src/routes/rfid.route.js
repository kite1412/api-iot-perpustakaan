const express = require('express');
const { getRFIDsHandler } = require('../controllers/rfid.controller');
const router = express.Router();

router.get("/", getRFIDsHandler);

module.exports = router;