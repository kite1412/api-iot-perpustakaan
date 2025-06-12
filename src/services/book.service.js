const { updateBookById, deleteBookById, getBookById, createBook, getBooks } = require('../repositories/book.repository');
const { updateRFID } = require('../repositories/rfid.repository');

async function getBooksService(page, limit) {
  const data = await getBooks(page, limit);
  return data;
}

async function getBookByIdService(id) {
  const book = await getBookById(id);
  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }
  return book;
}

async function updateBookService(id, data) {
  // Pastikan book ada dulu
  const book = await getBookById(id);
  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  return await updateBookById(id, data);
}

async function deleteBookService(id) {
  // Pastikan book ada dulu
  const book = await getBookById(id);
  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  return await deleteBookById(id);
}

async function createBookService(bookData, idRFID, rfidType) {
  // Bisa tambah logic validasi bisnis (misalnya cek duplicate isbn) jika ingin
  await updateRFID(idRFID, rfidType);
  return await createBook(bookData);
}

module.exports = {
  getBooksService,
  getBookByIdService,
  updateBookService,
  deleteBookService,
  createBookService,
};
