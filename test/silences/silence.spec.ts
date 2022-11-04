import { assert } from 'console';
import { Matcher, Silence, SilenceStatus } from '../../src';
import { isAPIGettableSilence } from '../../src/utils/apiValidator';

describe('Silence class', () => {
  it('should construct with right paramters', () => {
    const id = '123';
    const status = { state: 'active' } as SilenceStatus;
    const updatedAt = new Date();
    const matcher = new Matcher('test', 'a value', true);
    const startsAt = new Date();
    const endsAt = new Date(new Date().setTime(startsAt.getTime() + 3 * 60 * 60 * 1000));
    const createdBy = 'Testing';
    const comment = 'Automated testing is running';

    const silence = new Silence(id, status, updatedAt, [matcher], startsAt, endsAt, createdBy, comment);

    expect(silence.status).toBe(status);
    expect(silence.id).toBe(id);
    expect(silence.endsAt).toBe(endsAt);
    expect(silence.createdBy).toBe(createdBy);
  });

  it('should construct from a valid API object', () => {
    const apiObject = {
      id: 'a',
      status: {
        state: 'active',
      } as SilenceStatus,
      updatedAt: '2022-11-04T13:58:25.752Z',
      startsAt: '2022-11-04T13:58:25.752Z',
      endsAt: '2022-11-04T15:58:25.752Z',
      matchers: [
        {
          name: 'a',
          value: 'b',
          isRegex: true,
        },
      ],
      createdBy: 'test',
      comment: 'testing',
    };

    const date = new Date('2022-11-04T15:58:25.752Z');

    expect(isAPIGettableSilence(apiObject)).toBeTruthy();

    const silence = Silence.fromJSON(apiObject);

    expect(silence.endsAt).toStrictEqual(date);
  });

  it('should fail from a invalid API object', () => {
    const apiObject = {
      id: 'a',
      status: {
        state: 'active',
      } as SilenceStatus,
      updatedAt: '2022-11-04T13:58:25.752Z',
      startsAt: '2022-11-04T13:58:25.752Z',
      endsAt: '2022-11-04T15:58:25.752Z',
      matchers: {
        name: 'a',
        value: 'b',
        isRegex: true,
      },
      createdBy: 'test',
      comment: 'testing',
    };

    // @ts-ignore
    expect(() => Silence.fromJSON(apiObject)).toThrow();
  });

  it('should accept new values from setter', () => {
    const id = '123';
    const status = { state: 'active' } as SilenceStatus;
    const updatedAt = new Date();
    const matcher = new Matcher('test', 'a value', true);
    const startsAt = new Date();
    const endsAt = new Date(new Date().setTime(startsAt.getTime() + 3 * 60 * 60 * 1000));
    const createdBy = 'Testing';
    const comment = 'Automated testing is running';

    const silence = new Silence(id, status, updatedAt, [matcher], startsAt, endsAt, createdBy, comment);

    silence.id = '321';
    expect(silence.id).toBe('321');

    silence.status = { state: 'expired' };
    expect(silence.status.state).toBe('expired');

    const replaceDate = new Date('2021-11-04T15:58:25.752Z');
    silence.startsAt = replaceDate;
    silence.endsAt = replaceDate;
    silence.updatedAt = replaceDate;

    expect(silence.endsAt).toBe(replaceDate);
    expect(silence.startsAt).toBe(replaceDate);
    expect(silence.updatedAt).toBe(replaceDate);

    const extraMatcher = new Matcher('dummy', 'weeeee', true, true);
    silence.matchers.push(extraMatcher);
    expect(silence.matchers).toStrictEqual([matcher, extraMatcher]);

    silence.matchers = [];
    expect(silence.matchers).toStrictEqual([]);

    silence.createdBy = 'Test3';
    expect(silence.createdBy).toBe('Test3');

    silence.comment = silence.comment + '...';
    expect(silence.comment).toBe(comment + '...');
  });
});
