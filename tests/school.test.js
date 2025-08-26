const request = require('supertest');
const express = require('express');
const schoolRoutes = require('../src/routes/schoolRoutes');

const app = express();
app.use(express.json());
app.use('/', schoolRoutes);

describe('School API', () => {
  describe('POST /addSchool', () => {
    it('should add a new school with valid data', async () => {
      const res = await request(app)
        .post('/addSchool')
        .send({
          name: 'Test School',
          address: '123 Test St',
          latitude: 40.7128,
          longitude: -74.0060
        });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test School');
    });

    it('should return 400 for invalid data', async () => {
      const res = await request(app)
        .post('/addSchool')
        .send({ name: '', address: '', latitude: 'abc', longitude: null });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('GET /listSchools', () => {
    it('should return schools sorted by proximity', async () => {
      const res = await request(app)
        .get('/listSchools')
        .query({ latitude: 40.7128, longitude: -74.0060 });
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 1) {
        expect(res.body[0].distance).toBeLessThanOrEqual(res.body[1].distance);
      }
    });

    it('should return 400 for missing coordinates', async () => {
      const res = await request(app)
        .get('/listSchools')
        .query({ latitude: '', longitude: '' });
      expect(res.statusCode).toBe(400);
    });
  });
});
