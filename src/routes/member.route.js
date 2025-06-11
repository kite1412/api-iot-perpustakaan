const express = require('express');
const router = express.Router();
const {
  createMemberHandler,
  getMembersHandler,
  getMemberByIdHandler,
  updateMemberHandler,
  deleteMemberHandler,
} = require('../controllers/member.controller');

router.post('/', createMemberHandler);
router.get('/', getMembersHandler);
router.get('/:id', getMemberByIdHandler);
router.put('/:id', updateMemberHandler);
router.delete('/:id', deleteMemberHandler);

module.exports = router;
