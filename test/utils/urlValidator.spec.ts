import { isURL } from '../../src/utils/urlValidator';

describe('url_validator', () => {
  it('should accept a vaild url', () => {
    expect(isURL('http://google.com')).toBe(true);
    expect(isURL('https://reddit.com/r/jailbreak')).toBe(true);
  });

  it('should decline a invaild url', () => {
    expect(isURL('i am not a freaking url')).toBe(false);
    expect(isURL('https:/reddit.com/r/jailbreak')).toBe(false);
  });
});
