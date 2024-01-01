import request from 'supertest';
import express from 'express';
import homePageRouter from '../routes/v1/homePage.route';

const app = express();
app.use(express.json());
app.use('/homePage', homePageRouter);

describe('POST /homePage/create', () => {
  it('should create a new home page', async () => {
    const res = await request(app).post('/homePage/create').send({
      // your request body here
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('homePage');
  });
});

describe('GET /homePage/:tenantId', () => {
  it('should get a home page by tenantId', async () => {
    const tenantId = 'your-tenant-id';
    const res = await request(app).get(`/homePage/${tenantId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('homePage');
  });
});
