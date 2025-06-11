const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addPengunjung(req, res) {
  const { jumlah } = req.body;

  try {
    const data = await prisma.pengunjung.create({
      data: {
        jumlah,
      },
    });

    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Gagal simpan:', error);
    res.status(500).json({ success: false, error: 'Gagal simpan data' });
  }
}

async function getPengunjung(req, res) {
  try {
    const data = await prisma.pengunjung.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const total = await prisma.pengunjung.count();

    res.json({
      total,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data pengunjung.' });
  }
}

module.exports = {
  addPengunjung,
  getPengunjung,
};
