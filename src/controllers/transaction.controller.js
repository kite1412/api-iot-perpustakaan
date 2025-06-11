const { memberIdParamSchema } = require('../models/transaction.model');
const { getTransactionsByMemberIdService, getAllTransactionsService } = require('../services/transaction.service');

async function getTransactionsByMemberIdHandler(req, res) {
  try {
    // Validasi param member_id
    const { error } = memberIdParamSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const member_id = parseInt(req.params.member_id);
    const transactions = await getTransactionsByMemberIdService(member_id);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getAllTransactionsHandler(req, res) {
  try {
    const transactions = await getAllTransactionsService();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getTransactionsByMemberIdHandler,
  getAllTransactionsHandler,
};
