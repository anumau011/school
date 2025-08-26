const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Add School Controller
async function addSchool(req, res) {
  const { name, address, latitude, longitude } = req.body;
  if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Invalid input' });
  }
  try {
    const school = await prisma.school.create({
      data: { name, address, latitude, longitude }
    });
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
}

module.exports = { addSchool };
