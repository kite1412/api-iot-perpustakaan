const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createMember(data) {
  return await prisma.member.create({
    data,
  });
}

async function getMembers(filter = {}, pagination = {}) {
  const { name, memberId } = filter;
  const { limit = 10, offset = 0 } = pagination;

  const where = {};

  if (name) {
    where.name = { contains: name, mode: 'insensitive' };
  }
  if (memberId) {
    where.memberId = { contains: memberId, mode: 'insensitive' };
  }

  return await prisma.member.findMany({
    where,
    skip: offset,
    take: limit,
    orderBy: { id: 'asc' },
    include: {
      rfidTag: true, // Jika ingin tampilkan data rfidTag juga
    },
  });
}

async function getMemberById(id) {
  return await prisma.member.findUnique({
    where: { id },
    include: {
      rfidTag: true,
    },
  });
}

async function updateMember(id, data) {
  return await prisma.member.update({
    where: { id },
    data,
  });
}

async function deleteMember(id) {
  return await prisma.member.delete({
    where: { id },
  });
}

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
