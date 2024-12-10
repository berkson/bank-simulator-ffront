import { ValidationError } from './validationerror.model';

describe('ValidationError', () => {
  it('should create an instance', () => {
    expect(new ValidationError(400, 'BAD REQUEST', '/test', ['invalid field'])).toBeTruthy();
  });
});
