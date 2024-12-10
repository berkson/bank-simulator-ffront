import { ApiError } from './api-error.model';

describe('ApiError', () => {
  it('should create an instance', () => {
    expect(new ApiError(400, 'BAD REQUEST', '/api/test')).toBeTruthy();
  });
});
