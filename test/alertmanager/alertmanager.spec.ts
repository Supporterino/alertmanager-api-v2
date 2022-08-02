import { Alertmanager, Matcher } from '../../src';
import { CreateSilence, UpdateSilence } from '../../src/alertmanager/alertmanagerOptions';
import mockAxios from '../../src/__mocks__/axios';
import { activeSilence, receiversResponse, silencesResponse, silencesResult, statusResponse, statusResult } from './alertmanager.consts';

describe('alertmanager', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('should construct with a valid URL', () => {
    const amtool = new Alertmanager('http://localhost:9090');

    expect(amtool).toBeInstanceOf(Alertmanager);
  });

  it('should throw error with a invalid URL', () => {
    expect(() => new Alertmanager('http:/localhost:9090')).toThrow();
  });

  it('should return valid AlertmanagerStatus', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const statusPromise = amtool.getStatus();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v2/status');

    mockAxios.mockResponse({ data: statusResponse, status: 200 });

    const result = await statusPromise;

    expect(result).toStrictEqual(statusResult);
  });

  it('should return valid receivers list', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const receiversPromise = amtool.getReceivers();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v2/receivers');

    mockAxios.mockResponse({ data: receiversResponse, status: 200 });

    const result = await receiversPromise;

    expect(result).toStrictEqual(receiversResponse);
  });

  it('should return valid silences list', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const silencesPromise = amtool.getSilences();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v2/silences');

    mockAxios.mockResponse({ data: silencesResponse, status: 200 });

    const result = await silencesPromise;

    expect(result).toStrictEqual(silencesResult);
  });

  it('should return only the active silence', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const silencesPromise = amtool.getActiveSilences();

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v2/silences');

    mockAxios.mockResponse({ data: silencesResponse, status: 200 });

    const result = await silencesPromise;

    expect(result[0]).toStrictEqual(activeSilence);
  });

  it('should create a valid silence', async () => {
    const amtool = new Alertmanager('http://localhost:9090');
    const dateStart = new Date();
    const dateEnd = new Date(new Date().setDate(dateStart.getDate() + 1));

    const createPromise = amtool.createSilence({
      matchers: [new Matcher('a', 'b', false)],
      startsAt: dateStart,
      endsAt: dateEnd,
      createdBy: 'abc',
      comment: 'def',
    } as CreateSilence);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v2/silences', {
      comment: 'def',
      createdBy: 'abc',
      endsAt: dateEnd.toJSON(),
      matchers: [{ isEqual: true, isRegex: false, name: 'a', value: 'b' }],
      startsAt: dateStart.toJSON(),
    });

    mockAxios.mockResponse({ data: { silenceID: '778a3ae3-f815-4cab-ae72-01bb3f255f93' }, status: 200 });

    const result = await createPromise;

    expect(result).toStrictEqual({ silenceID: '778a3ae3-f815-4cab-ae72-01bb3f255f93' });
  });

  it('should catch error when payload is wrong', async () => {
    const amtool = new Alertmanager('http://localhost:9090');
    const dateStart = new Date();
    const dateEnd = new Date(new Date().setDate(dateStart.getDate() + 1));

    const createPromise = amtool.createSilence({
      matchers: [new Matcher('', '', true)],
      startsAt: dateStart,
      endsAt: dateEnd,
      createdBy: 'abc',
      comment: 'def',
    } as CreateSilence);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v2/silences', {
      comment: 'def',
      createdBy: 'abc',
      matchers: [{ name: '', value: '', isRegex: true, isEqual: true }],
      endsAt: dateEnd.toJSON(),
      startsAt: dateStart.toJSON(),
    });

    mockAxios.mockResponse({ data: 'missing matchers for silence', status: 400 });

    let message = false;
    try {
      await createPromise;
    } catch (error) {
      message = true;
    }

    expect(message).toBeTruthy();
  });

  it('should update a valid silence', async () => {
    const amtool = new Alertmanager('http://localhost:9090');
    const dateStart = new Date();
    const dateEnd = new Date(new Date().setDate(dateStart.getDate() + 1));

    const createPromise = amtool.updateSilence({
      id: '778a3ae3-f815-4cab-ae72-01bb3f255f93',
      matchers: [new Matcher('a', 'b', false)],
      startsAt: dateStart,
      endsAt: dateEnd,
      createdBy: 'abc',
      comment: 'def - updating',
    } as UpdateSilence);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v2/silences', {
      comment: 'def - updating',
      id: '778a3ae3-f815-4cab-ae72-01bb3f255f93',
      createdBy: 'abc',
      endsAt: dateEnd.toJSON(),
      matchers: [{ isEqual: true, isRegex: false, name: 'a', value: 'b' }],
      startsAt: dateStart.toJSON(),
    });

    mockAxios.mockResponse({ data: { silenceID: '778a3ae3-f815-4cab-ae72-01bb3f255f93' }, status: 200 });

    const result = await createPromise;

    expect(result).toStrictEqual({ silenceID: '778a3ae3-f815-4cab-ae72-01bb3f255f93' });
  });

  it('should catch a wrong id error', async () => {
    const amtool = new Alertmanager('http://localhost:9090');
    const dateStart = new Date();
    const dateEnd = new Date(new Date().setDate(dateStart.getDate() + 1));

    const updatePromise = amtool.updateSilence({
      id: '778a3ae3-f815-4cab-ae72-01bb3f255f93',
      matchers: [new Matcher('a', 'b', false)],
      startsAt: dateStart,
      endsAt: dateEnd,
      createdBy: 'abc',
      comment: 'def - updating',
    } as UpdateSilence);

    expect(mockAxios.post).toHaveBeenCalledWith('/api/v2/silences', {
      comment: 'def - updating',
      id: '778a3ae3-f815-4cab-ae72-01bb3f255f93',
      createdBy: 'abc',
      endsAt: dateEnd.toJSON(),
      matchers: [{ isEqual: true, isRegex: false, name: 'a', value: 'b' }],
      startsAt: dateStart.toJSON(),
    });

    mockAxios.mockResponse({ data: {}, status: 404 });

    let message = false;
    try {
      await updatePromise;
    } catch (error) {
      message = true;
    }

    expect(message).toBeTruthy();
  });

  it('should get a silence by id', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const silence = amtool.getSilence('8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    expect(mockAxios.get).toHaveBeenCalledWith('/api/v2/silence/8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    mockAxios.mockResponse({ data: silencesResponse[0], status: 200 });

    expect((await silence).id).toBe('8a7505f7-f432-42f1-9fea-ccaf7e1391ec');
  });

  it('should delete a silence by id', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const silence = amtool.deleteSilence('8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    expect(mockAxios.delete).toHaveBeenCalledWith('/api/v2/silence/8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    mockAxios.mockResponse({ data: {}, status: 200 });

    expect(await silence).toBe(true);
  });

  it('should show failure if delete fails', async () => {
    const amtool = new Alertmanager('http://localhost:9090');

    const silence = amtool.deleteSilence('8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    expect(mockAxios.delete).toHaveBeenCalledWith('/api/v2/silence/8a7505f7-f432-42f1-9fea-ccaf7e1391ec');

    mockAxios.mockResponse({ data: {}, status: 404 });

    expect(await silence).toBe(false);
  });
});
