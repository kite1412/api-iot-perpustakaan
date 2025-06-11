require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MQTT_HOST: process.env.MQTT_HOST,
};
