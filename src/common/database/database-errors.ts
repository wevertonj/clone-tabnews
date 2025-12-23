export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

export class DatabaseNotFoundError extends DatabaseError {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseNotFoundError';
  }
}
