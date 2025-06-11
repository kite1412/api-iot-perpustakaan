const app = require('./src/app');
const envConfig = require('./src/config/env.config');

// Pastikan ini dijalankan setelah semua middleware
app.listen(envConfig.PORT, () => {
  console.log(`Server berjalan di port ${envConfig.PORT}`);
});
