const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateRFID(idRFID, rfidType) {
  return await prisma.rfidTag.update({
    where: { id: idRFID },
    data: {
      type: rfidType,
      status: 'registered',
    },
  });
}

async function getRFIDs() {
  return await prisma.rfidTag.findMany({
    select: {
      id: true,
      uid: true
    }
  });
}

module.exports = {
  updateRFID,
  getRFIDs
};
