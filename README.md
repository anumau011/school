# School Management API

A Node.js, Express.js, and MySQL REST API to manage school data, add new schools, and list schools sorted by proximity.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure your MySQL connection in `.env`:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```
3. Run Prisma migration and generate client:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Start the server:
   ```bash
   node src/app.js
   ```

## API Endpoints

### Add School
- **Endpoint:** `/addSchool`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.3456,
    "longitude": 78.9012
  }
  ```
- **Response:**
  - `200 OK` with created school object
  - `400 Bad Request` for invalid input

### List Schools
- **Endpoint:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude`: User's latitude
  - `longitude`: User's longitude
- **Response:**
  - `200 OK` with array of schools sorted by proximity
  - Each school object includes a `distance` field (in km)
  - `400 Bad Request` for invalid/missing coordinates

## Testing

Run tests with:
```bash
npm test
```

## Postman Collection

A Postman collection can be created and exported for these endpoints. Example requests are shown above.

---

Feel free to contribute or raise issues!


