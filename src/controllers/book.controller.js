const { getBooksQuerySchema, getBookByIdParamsSchema, bookIdParamsSchema, bookUpdateBodySchema, bookCreateSchema } = require('../models/book.model');
const { getBooksService, getBookByIdService, updateBookService, deleteBookService, createBookService } = require('../services/book.service');
const { ValidationError } = require('../utils/errorHandler.mock');
const { publishToEsp } = require('../services/mqtt.publisher.service');

async function getBooksHandler(req, res) {
  try {
    // Validasi query params
    const { error, value } = getBooksQuerySchema.validate(req.query);

    if (error) {
      throw new ValidationError(error.details);
    }

    const { page, limit } = value;

    const result = await getBooksService(page, limit);

    res.json({
      page,
      limit,
      total: result.total,
      data: result.books,
    });
  } catch (err) {
    throw err;
  }
}

async function getBookByIdHandler(req, res) {
  try {
    // Validasi parameter path id
    const { error, value } = getBookByIdParamsSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const book = await getBookByIdService(value.id);
    res.json(book);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

async function updateBookHandler(req, res) {
  try {
    // Validasi id param
    const { error: paramError, value: params } = bookIdParamsSchema.validate(req.params);
    if (paramError) return res.status(400).json({ error: paramError.details[0].message });

    // Validasi body update
    const { error: bodyError, value: body } = bookUpdateBodySchema.validate(req.body);
    if (bodyError) return res.status(400).json({ error: bodyError.details[0].message });

    const updatedBook = await updateBookService(params.id, body);
    res.json(updatedBook);
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

async function deleteBookHandler(req, res) {
  try {
    // Validasi id param
    const { error: paramError, value: params } = bookIdParamsSchema.validate(req.params);
    if (paramError) return res.status(400).json({ error: paramError.details[0].message });

    await deleteBookService(params.id);
    res.status(204).send(); // No content
  } catch (err) {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message });
  }
}

async function createBookHandler(req, res) {
  try {
    // Validasi body request
    const { error, value } = bookCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newBook = await createBookService(value, value.rfidTagId, 'book');

    publishToEsp('esp/receive', value.title);

    res.status(201).json(newBook);
  } catch (err) {
    // Jika error unique isbn, kembalikan error 409 conflict (optional)
    if (err.code === 'P2002' && err.meta.target.includes('isbn')) {
      return res.status(409).json({ error: 'ISBN already exists' });
    }

    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
  createBookHandler,
};
