const express = require('express');
const router = express.Router();

const { getTransactionsByMemberIdHandler, getAllTransactionsHandler } = require('../controllers/transaction.controller');

// GET all transactions
router.get('/', getAllTransactionsHandler);

// GET transactions by member_id
router.get('/member/:member_id', getTransactionsByMemberIdHandler);

module.exports = router;
