const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser } = require('../repositories/auth.repository');

const JWT_SECRET = process.env.JWT_SECRET;

async function register(username, password) {
  // Cek apakah username sudah ada
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new Error('Username already taken');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Simpan user baru
  const newUser = await createUser(username, hashedPassword);

  // Buat token JWT
  const token = jwt.sign({ userId: newUser.id, username: newUser.username }, JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
    },
  };
}

async function login(username, password) {
  const user = await findUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid username or password');
  }

  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
}

module.exports = {
  register,
  login,
};
