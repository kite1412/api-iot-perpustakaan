const { getRFIDs } = require("../repositories/rfid.repository");

async function getRFIDsService() {
  return await getRFIDs();
}

module.exports = {
  getRFIDsService,
};