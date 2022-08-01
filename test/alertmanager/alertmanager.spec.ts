import { Alertmanager } from '../../src';
import mockAxios from '../../src/__mocks__/axios';
import { statusResponse, statusResult } from './alertmanager.consts';

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
});
