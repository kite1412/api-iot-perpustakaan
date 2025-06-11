const mqttClient = require('../config/mqtt.config');

function publishToEsp(topic, payload) {
  try {
    mqttClient.publish(topic, payload);
    console.log(`[MQTT] Published to ${topic}:`, payload);
  } catch (err) {
    console.error('[MQTT Publisher] Failed to publish:', err.message);
  }
}

module.exports = { publishToEsp };
