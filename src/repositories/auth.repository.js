const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const findUserByUsername = async (username) => {
  return await prisma.admin.findUnique({
    where: { username },
  });
};

const createUser = async (username, hashedPassword) => {
  return await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });
};

module.exports = {
  findUserByUsername,
  createUser,
};
