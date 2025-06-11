const { getRFIDsService } = require("../services/rfid.service");

async function getRFIDsHandler(req, res) {
  try {
    const r = await getRFIDsService();

    res.json(r);
  } catch (e) {
    throw e;
  }
}

module.exports = {
  getRFIDsHandler
};