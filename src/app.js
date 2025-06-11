const express = require('express');
const cors = require('cors');

const { handleError } = require('./utils/errorHandler.mock');

const authRoutes = require('./routes/auth.route');
const bookRoutes = require('./routes/book.route');
const memberRoutes = require('./routes/member.route');
const transactionRoutes = require('./routes/transaction.routes');
require('./services/mqtt.service'); // Inisialisasi MQTT listener

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/members', memberRoutes);
app.use('/transactions', transactionRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK - ENDPOINT SUCCESS' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  handleError(err, req, res);
});

module.exports = app;
