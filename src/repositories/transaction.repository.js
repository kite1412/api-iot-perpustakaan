const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTransactionsByMemberId(member_id) {
  return await prisma.transaction.findMany({
    where: { member_id },
    include: {
      book: true,
      member: true,
    },
  });
}

async function getAllTransactions() {
  return await prisma.transaction.findMany({
    include: {
      book: true,
      member: true,
    },
  });
}

module.exports = {
  getTransactionsByMemberId,
  getAllTransactions,
};
