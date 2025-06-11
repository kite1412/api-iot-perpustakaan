const express = require('express');
const { getRFIDsHandler, getAvailableRFIDsHandler } = require('../controllers/rfid.controller');
const router = express.Router();

router.get("/", getRFIDsHandler);
router.get("/available", getAvailableRFIDsHandler);

module.exports = router;