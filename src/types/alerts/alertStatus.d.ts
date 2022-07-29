export interface AlertStatus {
  state: AlertStateString;
  silencedBy: Array<string>;
  inhibitedBy: Array<string>;
}

export type AlertStateString = 'unprocessed' | 'active' | 'supressed';
