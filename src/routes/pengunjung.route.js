const express = require('express');
const router = express.Router();
const { addPengunjung, getPengunjung } = require('../controllers/pengunjung.controller');

router.get('/', getPengunjung);
router.post('/', addPengunjung);

module.exports = router;
