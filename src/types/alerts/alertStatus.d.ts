interface APIAlertStatus {
  state: APIAlertStateString;
  silencedBy: Array<string>;
  inhibitedBy: Array<string>;
}

type AlertStateString = 'unprocessed' | 'active' | 'supressed';
