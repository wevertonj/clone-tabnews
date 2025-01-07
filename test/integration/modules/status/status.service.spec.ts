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

  it('GET to /api/status should return a valid dependencies.postgres field', () => {
    expect(responseBody.dependencies.postgres).toBeDefined();
  });

  it('GET to /api/status should return a valid dependencies.postgres.status field', () => {
    expect(responseBody.dependencies.postgres.status).toBeDefined();
    expect(responseBody.dependencies.postgres.status).toBe(StatusType.OK);
  });

  it('GET to /api/status should return a valid dependencies.postgres.version field', () => {
    expect(responseBody.dependencies.postgres.version).toBeDefined();
    const versionRegex = /^\d+\.\d+$/;
    expect(responseBody.dependencies.postgres.version).toMatch(versionRegex);
  });

  it('GET to /api/status should return a valid dependencies.postgres.maxConnections field', () => {
    expect(responseBody.dependencies.postgres.maxConnections).toBeDefined();
    expect(responseBody.dependencies.postgres.maxConnections).toBeGreaterThan(0);
  });

  it('GET to /api/status should return a valid dependencies.postgres.activeConnections', () => {
    expect(responseBody.dependencies.postgres.activeConnections).toBeDefined();
    expect(responseBody.dependencies.postgres.activeConnections).toBeGreaterThan(0);
  });

});
