import mockAxios from 'jest-mock-axios';
import { Alertmanager } from '../../src';

describe('alertmanager', () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  it('should construct with a valid URL', () => {
    const amtool = new Alertmanager('http://localhost:9090');

    expect(amtool).toBeInstanceOf(Alertmanager);
  });

  it('should throw error with a invalid URL', () => {
    expect(() => new Alertmanager('http:/localhost:9090')).toThrow();
  });

  it('should return valid AlertmanagerStatus', () => {
    // mockAxios.get.mockResolvedValue();
  });
});
