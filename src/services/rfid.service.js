const { getRFIDs, getAvailableRFIDs } = require("../repositories/rfid.repository");

async function getRFIDsService() {
  return await getRFIDs();
}

async function getAvailableRFIDsService() {
  return await getAvailableRFIDs();
}

module.exports = {
  getRFIDsService,
  getAvailableRFIDsService
};