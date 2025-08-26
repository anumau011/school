const express = require('express');
const router = express.Router();
const { addSchool } = require('../controllers/schoolController');
const { listSchools } = require('../controllers/listController');

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);

module.exports = router;
