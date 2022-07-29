import axios, { AxiosInstance } from 'axios';
import { Silence, silencesFromAPIArray } from '../silences/silence';
import { APIGettableSilence } from '../types/silences/gettableSilence';
import { isURL } from '../utils/urlValidator';
import { BasicAuth, AlertmanagerOptions } from './alertmanagerOptions';

export class Alertmanager {
  private _url: string;
  private _basicAuth: BasicAuth | undefined;
  private _paths: Map<string, string>;
  private _httpClient: AxiosInstance | undefined;

  constructor(url: string, options?: AlertmanagerOptions) {
    if (!isURL(url)) throw new Error(`The given url (${url}) isn't a valid URL.`);
    this._url = url;
    if (options && options.auth) {
      this._basicAuth = options.auth;
    }
    this._paths = getPathsMap();
  }

  public async getSilences(): Promise<Silence[]> {
    if (!this._httpClient) this._httpClient = this.createHTTPClientInstance();
    const response = await this._httpClient.get(this._paths.get('silences')!);
    return silencesFromAPIArray(response.data as APIGettableSilence[]);
  }

  public async getActiveSilences(): Promise<Silence[]> {
    const silences = this.getSilences();
    return (await silences).filter(silence => silence.status.state === 'active');
  }

  private createHTTPClientInstance(): AxiosInstance {
    return axios.create({
      baseURL: this._url,
      timeout: 1000,
      ...(this._basicAuth && {
        headers: {
          Authorization: `Basic ${Buffer.from(this._basicAuth.username + ':' + this._basicAuth.password).toString('base64')}`,
        },
      }),
    });
  }
}

const getPathsMap = (): Map<string, string> => {
  const map = new Map<string, string>();
  map.set('silences', '/api/v2/silences');
  return map;
};
