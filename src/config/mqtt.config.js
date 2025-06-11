const mqtt = require('mqtt');
const envConfig = require('./env.config');

const mqttClient = mqtt.connect(envConfig.MQTT_HOST);

mqttClient.on('connect', () => {
  console.log('[MQTT] Connected to broker');
  //esp/send
  mqttClient.subscribe('esp/scan', (err) => {
    if (err) console.error('[MQTT] Subscribe error:', err.message);
    else console.log('[MQTT] Subscribed to esp/scan');
  });

  mqttClient.subscribe('esp/transaction', (err) => {
    if (err) console.error('[MQTT] Subscribe error:', err.message);
    else console.log('[MQTT] Subscribed to esp/transaction');
  });

  // mqttClient.subscribe('esp/checkMember', (err) => {
  //   if (err) console.error('[MQTT] Subscribe error:', err.message);
  //   else console.log('[MQTT] Subscribed to esp/checkMember');
  // });
});

mqttClient.on('error', (err) => {
  console.error('[MQTT] Error:', err.message);
});

module.exports = mqttClient;
