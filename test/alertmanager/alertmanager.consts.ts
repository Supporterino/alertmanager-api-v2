import { Silence, silencesFromAPIArray } from '../../src/silences/silence';
import { APIGettableSilence } from '../../src/types/silences/gettableSilence';

export const statusResponse = {
  uptime: '2022-06-23T07:15:15.759Z',
  config: {
    original:
      'global:\n  resolve_timeout: 5m\n  http_config:\n    follow_redirects: true\n  smtp_hello: localhost\n  smtp_require_tls: true\n  slack_api_url: <secret>\n  pagerduty_url: https://events.pagerduty.com/v2/enqueue\n  opsgenie_api_url: https://api.opsgenie.com/\n  wechat_api_url: https://qyapi.weixin.qq.com/cgi-bin/\n  victorops_api_url: https://alert.victorops.com/integrations/generic/20131114/alert/\n  telegram_api_url: https://api.telegram.org\n',
  },
  cluster: {
    name: '01G67PMHENCCK7W3XQR7FB5PH0',
    peers: [
      {
        address: '10.233.1.1:9094',
        name: '01G67P4NXKFYQZRZWZXX34W480',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67P7G5SA7Y99DY52M9ZWRVJ',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67PKGGPWDB97K2FHFAX7DXH',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67PMHENCCK7W3XQR7FB5PH0',
      },
    ],
    status: 'ready',
  },
  versionInfo: {
    branch: 'HEAD',
    buildDate: '20220325-09:31:33',
    buildUser: 'root@265f14f5c6fc',
    goVersion: 'go1.17.8',
    revision: 'f484b17fa3c583ed1b2c8bbcec20ba1db2aa5f11',
    version: '0.24.0',
  },
};

export const statusResult = {
  uptime: new Date('2022-06-23T07:15:15.759Z'),
  config: {
    original:
      'global:\n  resolve_timeout: 5m\n  http_config:\n    follow_redirects: true\n  smtp_hello: localhost\n  smtp_require_tls: true\n  slack_api_url: <secret>\n  pagerduty_url: https://events.pagerduty.com/v2/enqueue\n  opsgenie_api_url: https://api.opsgenie.com/\n  wechat_api_url: https://qyapi.weixin.qq.com/cgi-bin/\n  victorops_api_url: https://alert.victorops.com/integrations/generic/20131114/alert/\n  telegram_api_url: https://api.telegram.org\n',
  },
  cluster: {
    name: '01G67PMHENCCK7W3XQR7FB5PH0',
    peers: [
      {
        address: '10.233.1.1:9094',
        name: '01G67P4NXKFYQZRZWZXX34W480',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67P7G5SA7Y99DY52M9ZWRVJ',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67PKGGPWDB97K2FHFAX7DXH',
      },
      {
        address: '10.233.1.1:9094',
        name: '01G67PMHENCCK7W3XQR7FB5PH0',
      },
    ],
    status: 'ready',
  },
  versionInfo: {
    branch: 'HEAD',
    buildDate: '20220325-09:31:33',
    buildUser: 'root@265f14f5c6fc',
    goVersion: 'go1.17.8',
    revision: 'f484b17fa3c583ed1b2c8bbcec20ba1db2aa5f11',
    version: '0.24.0',
  },
};

export const receiversResponse = [
  {
    name: 'default',
  },
  {
    name: 'page',
  },
  {
    name: 'notify',
  },
];

export const silencesResponse: Array<APIGettableSilence> = [
  {
    id: '8a7505f7-f432-42f1-9fea-ccaf7e1391ec',
    status: {
      state: 'active',
    },
    updatedAt: '2022-07-26T08:39:29.889Z',
    matchers: [
      {
        name: 'service_group',
        value: 'cassandra-cloud',
        isRegex: false,
        isEqual: true,
      },
    ],
    startsAt: '2022-07-26T08:39:29.889Z',
    endsAt: '2022-08-02T08:39:11.070Z',
    createdBy: 'abc',
    comment: 'shut up snaps servers',
  },
  {
    id: '1e7fc591-312e-4b6f-bc92-c07760e3e3da',
    status: {
      state: 'expired',
    },
    updatedAt: '2022-08-01T07:59:40.169Z',
    matchers: [
      {
        name: 'component_x',
        value: 'yes',
        isRegex: false,
        isEqual: true,
      },
      {
        name: 'environment_test',
        value: 'yes',
        isRegex: false,
        isEqual: true,
      },
    ],
    startsAt: '2022-08-01T07:59:40.169Z',
    endsAt: '2022-08-01T08:04:39.966Z',
    createdBy: 'PrometheusAlertSilenceService',
    comment: 'Programmatically generated silence because of update',
  },
  {
    id: '778a3ae3-f815-4cab-ae72-01bb3f255f93',
    status: {
      state: 'expired',
    },
    updatedAt: '2022-08-01T07:03:43.617Z',
    matchers: [
      {
        name: 'component_x',
        value: 'yes',
        isRegex: false,
        isEqual: true,
      },
      {
        name: 'environment_test',
        value: 'yes',
        isRegex: false,
        isEqual: true,
      },
    ],
    startsAt: '2022-08-01T07:03:43.617Z',
    endsAt: '2022-08-01T07:33:43.389Z',
    createdBy: 'PrometheusAlertSilenceService',
    comment: 'Programmatically generated silence because of update',
  },
];

export const silencesResult = silencesFromAPIArray(silencesResponse);

export const activeSilence = Silence.fromJSON({
  id: '8a7505f7-f432-42f1-9fea-ccaf7e1391ec',
  status: {
    state: 'active',
  },
  updatedAt: '2022-07-26T08:39:29.889Z',
  matchers: [
    {
      name: 'service_group',
      value: 'cassandra-cloud',
      isRegex: false,
      isEqual: true,
    },
  ],
  startsAt: '2022-07-26T08:39:29.889Z',
  endsAt: '2022-08-02T08:39:11.070Z',
  createdBy: 'abc',
  comment: 'shut up snaps servers',
});
