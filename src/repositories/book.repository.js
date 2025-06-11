const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getBooks(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const books = await prisma.book.findMany({
    skip,
    take: limit,
    orderBy: {
      title: 'asc',
    },
  });

  const total = await prisma.book.count();

  return {
    books,
    total,
  };
}

async function getBookById(id) {
  const book = await prisma.book.findUnique({
    where: { id: Number(id) },
  });
  return book;
}

async function updateBookById(id, data) {
  return await prisma.book.update({
    where: { id: Number(id) },
    data,
  });
}

async function deleteBookById(id) {
  return await prisma.book.delete({
    where: { id: Number(id) },
  });
}

async function createBook(data) {
  return await prisma.book.create({
    data,
  });
}

module.exports = {
  getBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  createBook,
};
