import { StatusJson, StatusType } from '@/modules/status';

let response: Response;
let responseBody: StatusJson;

beforeAll(async () => {
  response = await fetch('http://localhost:3000/api/status');
  responseBody = await response.json() as StatusJson;
});

describe('Status endpoint', () => {
  it('GET to /api/status should return 200', () => {
    expect(response.status).toBe(200);
  });

  it('GET to /api/status should return a valid updated_at field', () => {
    expect(responseBody.updated_at).toBeDefined();

    const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toBe(parseUpdatedAt);
  });

  it('GET to /api/status should return a valid dependencies field', () => {
    expect(responseBody.dependencies).toBeDefined();
  });

  it('GET to /api/status should return a valid dependencies.database field', () => {
    expect(responseBody.dependencies.database).toBeDefined();
  });

  it('GET to /api/status should return a valid dependencies.database.status field', () => {
    expect(responseBody.dependencies.database.status).toBeDefined();
    expect(responseBody.dependencies.database.status).toBe(StatusType.OK);
  });

  it('GET to /api/status should return a valid dependencies.database.version field', () => {
    expect(responseBody.dependencies.database.version).toBeDefined();
    const versionRegex = /^\d+\.\d+$/;
    expect(responseBody.dependencies.database.version).toMatch(versionRegex);
  });

  it('GET to /api/status should return a valid dependencies.database.maxConnections field', () => {
    expect(responseBody.dependencies.database.maxConnections).toBeDefined();
    expect(responseBody.dependencies.database.maxConnections).toBeGreaterThan(0);
  });

  it('GET to /api/status should return a valid dependencies.database.activeConnections', () => {
    expect(responseBody.dependencies.database.activeConnections).toBeDefined();
    expect(responseBody.dependencies.database.activeConnections).toBeGreaterThan(0);
  });

});
