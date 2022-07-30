import { isAPIMatcher } from '../../src/utils/apiValidator';
import { Matcher } from './../../src/index';

describe('Matcher class', () => {
  it('should construct with right paramters', () => {
    const matcher = new Matcher('test', 'a value', true);

    expect(matcher.name).toMatch('test');
    expect(matcher.value).toMatch('a value');
    expect(matcher.isEqual).toBe(true);
    expect(matcher.isRegex).toBe(true);
  });

  it('should return the right values after the use of setters', () => {
    const matcher = new Matcher('a', 'b', false, false);

    expect(matcher.name).toMatch('a');
    expect(matcher.value).toMatch('b');
    expect(matcher.isEqual).toBe(false);
    expect(matcher.isRegex).toBe(false);

    matcher.isEqual = true;
    matcher.isRegex = true;
    matcher.name = 'c';
    matcher.value = 'd';

    expect(matcher.name).toMatch('c');
    expect(matcher.value).toMatch('d');
    expect(matcher.isEqual).toBe(true);
    expect(matcher.isRegex).toBe(true);
  });

  it('should construct a valid API object', () => {
    const matcher = new Matcher('test', 'a value', true);

    expect(isAPIMatcher(matcher.convertToAPIObject())).toBe(true);
  });
});
