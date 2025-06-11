const { getTransactionsByMemberId, getAllTransactions } = require('../repositories/transaction.repository');

async function getTransactionsByMemberIdService(member_id) {
  return await getTransactionsByMemberId(member_id);
}

async function getAllTransactionsService() {
  return await getAllTransactions();
}

module.exports = {
  getTransactionsByMemberIdService,
  getAllTransactionsService,
};
