interface APIAlertStatus {
  state: APIAlertStateString;
  silencedBy: Array<string>;
  inhibitedBy: Array<string>;
}

type APIAlertStateString = 'unprocessed' | 'active' | 'supressed';
