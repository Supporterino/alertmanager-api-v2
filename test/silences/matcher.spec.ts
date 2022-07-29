import { Matcher } from './../../src/index';

describe('Matcher class', () => {
  it('should construct with right paramters', () => {
    const matcher = new Matcher('test', 'a value', true);

    expect(matcher.name).toMatch('test');
    expect(matcher.value).toMatch('a value');
    expect(matcher.isEqual).toBe(true);
    expect(matcher.isRegex).toBe(true);
  });
});
