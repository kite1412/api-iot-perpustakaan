const {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} = require("../repositories/member.repository");
const { updateRFID } = require("../repositories/rfid.repository");

async function createMemberService(memberData, idRFID, rfidType) {
  await updateRFID(idRFID, rfidType);
  // Bisa tambah logika validasi bisnis di sini jika perlu
  return await createMember(memberData);
}

async function getMembersService(filter, pagination) {
  return await getMembers(filter, pagination);
}

async function getMemberByIdService(id) {
  return await getMemberById(id);
}

async function updateMemberService(id, data) {
  return await updateMember(id, data);
}

async function deleteMemberService(id, rfidTagId) {
  return await deleteMember(id, rfidTagId);
}

module.exports = {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService,
};
