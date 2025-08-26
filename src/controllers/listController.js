const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getDistance } = require('../utils/distance');

// List Schools Controller
async function listSchools(req, res) {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }
  try {
    const schools = await prisma.school.findMany();
    const sorted = schools
      .map(school => ({
        ...school,
        distance: getDistance(userLat, userLon, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);
    res.json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
}

module.exports = { listSchools };
