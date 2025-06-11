const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createRFID(uid) {
  return await prisma.rfidTag.create({
    data: {
      uid,
      status: 'unregistered',
    },
  });
}

async function getRFIDbyUID(uid) {
  return await prisma.rfidTag.findUnique({
    where: {
      uid,
    },
  });
}

async function getMemberByRFID(uid) {
  return await prisma.rfidTag.findFirst({
    where: {
      uid,
      type: 'member', // enum value
    },
    include: {
      member: true,
    },
  });
}

async function getBookByRFID(uid) {
  return await prisma.rfidTag.findFirst({
    where: { uid, type: 'book' },
    include: {
      book: true,
    },
  });
}

async function findActiveTransaction(bookId) {
  return prisma.transaction.findFirst({
    where: {
      bookId: bookId,
      status: 'borrowed',
    },
  });
}

// async function findRfidTag(uid) {
//   return prisma.rfidTag.findUnique({ where: { uid } });
// }

async function findMemberByRfid(rfidTagId) {
  return prisma.member.findFirst({ where: { rfidTagId } });
}

async function findBookByRfid(rfidTagId) {
  return prisma.book.findFirst({ where: { rfidTagId } });
}

async function createTransaction(memberId, bookId) {
  return prisma.transaction.create({
    data: {
      memberId,
      bookId,
      status: 'borrowed', // gunakan enum string sesuai schema
      borrowDate: new Date(),
    },
  });
}

async function completeTransaction(memberId, bookId) {
  return prisma.transaction.updateMany({
    where: {
      memberId,
      bookId,
      status: 'borrowed',
    },
    data: {
      status: 'returned',
      returnDate: new Date(),
    },
  });
}

module.exports = {
  createRFID,
  getRFIDbyUID,
  getMemberByRFID,
  getBookByRFID,
  findActiveTransaction,
  createTransaction,
  completeTransaction,
  findMemberByRfid,
  findBookByRfid,
};
