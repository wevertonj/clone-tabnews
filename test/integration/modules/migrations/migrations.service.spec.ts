
import { Database } from '@/shared/infra/database';

async function cleanDatabase() {
  const db = new Database();
  await db.query({ query: 'drop schema public cascade; create schema public;' });
}

describe('Migrations endpoint', () => {
  beforeAll(async () => {
    await cleanDatabase();
  });

  it('GET to /api/migrations should return 200', async () => {

    const response1 = await fetch('http://localhost:3000/api/migrations');
    const response1Body = await response1.json() as Array<any>;

    expect(response1.status).toBe(200);
    expect(Array.isArray(response1Body)).toBe(true);
    expect(response1Body.length).toBeGreaterThan(0);
  });

  it('POST to /api/migrations should return 200', async () => {
    const response1 = await fetch('http://localhost:3000/api/migrations', {
      method: 'POST',
    });
    const response1Body = await response1.json() as Array<any>;

    expect(response1.status).toBe(201);
    expect(Array.isArray(response1Body)).toBe(true);
    expect(response1Body.length).toBeGreaterThan(0);

    const response2 = await fetch('http://localhost:3000/api/migrations', {
      method: 'POST',
    });
    const response2Body = await response2.json() as Array<any>;

    expect(response2.status).toBe(200);
    expect(Array.isArray(response2Body)).toBe(true);
    expect(response2Body.length).toBe(0);
  });

});
