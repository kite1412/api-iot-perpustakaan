const {
  memberCreateSchema,
  getMembersQuerySchema,
  memberIdParamSchema,
  updateMemberSchema,
} = require("../models/member.model");
const {
  createMemberService,
  getMembersService,
  getMemberByIdService,
  updateMemberService,
  deleteMemberService,
} = require("../services/member.service");
const { publishToEsp } = require("../services/mqtt.publisher.service");

async function createMemberHandler(req, res) {
  try {
    const { error, value } = memberCreateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const newMember = await createMemberService(
      value,
      value.rfidTagId,
      "member"
    );

    publishToEsp("esp/receive", value.name);

    res.status(201).json(newMember);
  } catch (err) {
    // Contoh handle error khusus jika ada (misal duplicate rfidTagId)
    if (err.code === "P2002" && err.meta.target.includes("rfidTagId")) {
      return res.status(409).json({ error: "RFID Tag ID already registered" });
    }
    res.status(500).json({ error: err.message });
  }
}

async function getMembersHandler(req, res) {
  try {
    // Validasi query params
    const { error, value } = getMembersQuerySchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const filter = {
      name: value.name,
      memberId: value.memberId,
    };

    const pagination = {
      limit: value.limit,
      offset: value.offset,
    };

    const members = await getMembersService(filter, pagination);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getMemberByIdHandler(req, res) {
  try {
    // Validasi param id
    const { error: paramError } = memberIdParamSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({ error: paramError.details[0].message });
    }
    const id = parseInt(req.params.id);

    const member = await getMemberByIdService(id);
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateMemberHandler(req, res) {
  try {
    // Validasi param id
    const { error: paramError } = memberIdParamSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({ error: paramError.details[0].message });
    }
    // Validasi body
    const { error: bodyError, value } = updateMemberSchema.validate(req.body);
    if (bodyError) {
      return res.status(400).json({ error: bodyError.details[0].message });
    }
    const id = parseInt(req.params.id);

    // Cek member dulu
    const existingMember = await getMemberByIdService(id);
    if (!existingMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    const updatedMember = await updateMemberService(id, value);
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteMemberHandler(req, res) {
  try {
    // Validasi param id
    const { error: paramError } = memberIdParamSchema.validate(req.params);
    if (paramError) {
      return res.status(400).json({ error: paramError.details[0].message });
    }
    const id = parseInt(req.params.id);

    // Cek member dulu
    const existingMember = await getMemberByIdService(id);
    if (!existingMember) {
      return res.status(404).json({ error: "Member not found" });
    }

    await deleteMemberService(id, existingMember.rfidTagId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createMemberHandler,
  getMembersHandler,
  getMemberByIdHandler,
  updateMemberHandler,
  deleteMemberHandler,
};
