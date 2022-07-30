import { isValidGUID } from '../../src/utils/stringValidator';

describe('string_validator', () => {
  it('should accept a vaild guid/uuid', () => {
    expect(isValidGUID('eee920cb-80a5-4cb2-8ee5-6f026739e938')).toBe(true);
    expect(isValidGUID('37D43747-FE00-41E6-9F86-AE7A594501BA')).toBe(true);
  });

  it('should decline a invaild guid/uuid', () => {
    expect(isValidGUID('37D43747-FE00-41E6-9F86AE7A594501BA')).toBe(false);
    expect(isValidGUID('lol not a guid')).toBe(false);
  });
});
