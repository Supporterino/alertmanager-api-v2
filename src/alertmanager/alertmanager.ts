import axios, { AxiosInstance } from 'axios';
import { Silence, silencesFromAPIArray } from '../silences/silence';
import { Receiver } from '../types/alerts/receiver';
import { APIGettableSilence } from '../types/silences/gettableSilence';
import { APIMatcher } from '../types/silences/matcher';
import { APIPostableSilence } from '../types/silences/postableSilence';
import { APIAlertmanagerStatus } from '../types/status/alertmanagerStatus';
import { isURL } from '../utils/urlValidator';
import { BasicAuth, AlertmanagerOptions, CreateSilence, CreateSilenceResponse, UpdateSilence } from './alertmanagerOptions';
import { AlertmanagerStatus } from './alertmanagerStatus';

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

  public async getStatus(): Promise<AlertmanagerStatus> {
    if (!this._httpClient) this._httpClient = this.createHTTPClientInstance();
    const response = (await this._httpClient.get(this._paths.get('status')!)).data as APIAlertmanagerStatus;
    return {
      uptime: new Date(response.uptime),
      config: response.config,
      cluster: response.cluster,
      versionInfo: response.versionInfo,
    } as AlertmanagerStatus;
  }

  public async getReceivers(): Promise<Array<Receiver>> {
    if (!this._httpClient) this._httpClient = this.createHTTPClientInstance();
    const response = (await this._httpClient.get(this._paths.get('receivers')!)).data as Array<Receiver>;
    return response;
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

  public async createSilence(silence: CreateSilence): Promise<CreateSilenceResponse> {
    const requestData = this.createPostableSilenceData(silence);
    return await this.sendPostableSilence(requestData);
  }

  public async updateSilence(silence: UpdateSilence): Promise<CreateSilenceResponse> {
    const requestData = this.createPostableSilenceData(silence);
    requestData.id = silence.id;
    return await this.sendPostableSilence(requestData);
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

  private async sendPostableSilence(requestData: APIPostableSilence): Promise<CreateSilenceResponse> {
    if (!this._httpClient) this._httpClient = this.createHTTPClientInstance();
    const res = await this._httpClient.post(this._paths.get('silences')!, requestData);
    if (res.status === 400) throw new Error(`Bad request sent to /silence endpoint. Response: ${<string>res.data}`);
    if (res.status === 404) throw new Error(`No silence with this ID present. Response: ${<string>res.data}`);
    return res.data as CreateSilenceResponse;
  }

  private createPostableSilenceData(silence: CreateSilence | UpdateSilence): APIPostableSilence {
    const APImatchers: Array<APIMatcher> = [];
    silence.matchers.forEach(matcher => APImatchers.push(matcher.convertToAPIObject()));
    const requestData: APIPostableSilence = {
      matchers: APImatchers,
      startsAt: silence.startsAt.toJSON(),
      endsAt: silence.endsAt.toJSON(),
      createdBy: silence.createdBy,
      comment: silence.comment,
    };
    return requestData;
  }
}

const getPathsMap = (): Map<string, string> => {
  const map = new Map<string, string>();
  map.set('silences', '/api/v2/silences');
  map.set('status', '/api/v2/status');
  map.set('receivers', '/api/v2/receivers');
  return map;
};
