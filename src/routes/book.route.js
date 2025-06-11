const express = require('express');
const router = express.Router();
const { getBooksHandler, getBookByIdHandler, updateBookHandler, deleteBookHandler, createBookHandler } = require('../controllers/book.controller');

router.get('/', getBooksHandler);
router.get('/:id', getBookByIdHandler);
router.put('/:id', updateBookHandler);
router.delete('/:id', deleteBookHandler);
router.post('/', createBookHandler);

module.exports = router;
