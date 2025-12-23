import { StatusResponseDto } from '@/modules/status/dto/status-response.dto';
import { StatusType } from '@/modules/status/enums/status-type.enum';

let response: Response;
let responseBody: StatusResponseDto;

beforeAll(async () => {
  response = await fetch('http://localhost:3000/api/status');
  responseBody = await response.json() as StatusResponseDto;
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
    expect(responseBody.dependencies.database.version).toBe('17.2');
  });

  it('GET to /api/status should return a valid dependencies.database.max_connections field', () => {
    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  });

  it('GET to /api/status should return a valid dependencies.database.opened_connections', () => {
    expect(responseBody.dependencies.database.opened_connections).toBeDefined();
  });

});
