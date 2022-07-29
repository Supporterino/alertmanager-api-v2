import {
  isAPIGettableSilence,
  isAPIMatcher,
  isAPISilenceStatus,
} from '../../src/utils/apiValidator';

describe('api_validator', () => {
  it('should accept a vaild matcher', () => {
    expect(
      isAPIMatcher({
        name: 'a',
        value: 'b',
        isRegex: true,
        isEqual: false,
      })
    ).toBe(true);
  });

  it('should decline a missing parameter matcher', () => {
    expect(
      isAPIMatcher({
        name: 'a',
        value: 'b',
        isEqual: false,
      })
    ).toBe(false);
  });

  it('should decline a wrong parameter type matcher', () => {
    expect(
      isAPIMatcher({
        name: 'a',
        value: 'b',
        isRegex: 'false',
      })
    ).toBe(false);
  });

  it('should decline a wrong parameter status', () => {
    expect(
      isAPISilenceStatus({
        status: 'dummy',
      })
    ).toBe(false);
  });

  it('should accept a valid status', () => {
    expect(
      isAPISilenceStatus({
        state: 'active',
      })
    ).toBe(true);
  });

  it('should accept a valid silence', () => {
    expect(
      isAPIGettableSilence({
        id: 'a',
        status: {
          state: 'active',
        },
        updatedAt: 'datestring',
        startsAt: 'datestring',
        endsAt: 'datestring',
        matchers: [
          {
            name: 'a',
            value: 'b',
            isRegex: true,
          },
        ],
        createdBy: 'test',
        comment: 'testing',
      })
    ).toBe(true);
  });

  it('should decline a non matcher array silence', () => {
    expect(
      isAPIGettableSilence({
        id: 'a',
        status: {
          state: 'active',
        },
        updatedAt: 'datestring',
        startsAt: 'datestring',
        endsAt: 'datestring',
        matchers: {
          name: 'a',
          value: 'b',
          isRegex: true,
        },
        createdBy: 'test',
        comment: 'testing',
      })
    ).toBe(false);
  });

  it('should decline a a missing parameter silence', () => {
    expect(
      isAPIGettableSilence({
        status: {
          state: 'active',
        },
        updatedAt: 'datestring',
        startsAt: 'datestring',
        endsAt: 'datestring',
        matchers: [
          {
            name: 'a',
            value: 'b',
            isRegex: true,
          },
        ],
        createdBy: 'test',
        comment: 'testing',
      })
    ).toBe(false);
  });

  it('should decline a wrong status silence', () => {
    expect(
      isAPIGettableSilence({
        id: 'a',
        status: {
          status: 'active',
        },
        updatedAt: 'datestring',
        startsAt: 'datestring',
        endsAt: 'datestring',
        matchers: [
          {
            name: 'a',
            value: 'b',
            isRegex: true,
          },
        ],
        createdBy: 'test',
        comment: 'testing',
      })
    ).toBe(false);
  });

  it('should decline a wrong matcher silence', () => {
    expect(
      isAPIGettableSilence({
        id: 'a',
        status: {
          state: 'active',
        },
        updatedAt: 'datestring',
        startsAt: 'datestring',
        endsAt: 'datestring',
        matchers: [
          {
            name: 'a',
            value: 'b',
            isRegex: 'true',
          },
        ],
        createdBy: 'test',
        comment: 'testing',
      })
    ).toBe(false);
  });
});
