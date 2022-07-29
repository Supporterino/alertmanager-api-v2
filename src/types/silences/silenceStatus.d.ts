export interface SilenceStatus {
  state: SilenceStateString;
}

export type SilenceStateString = 'expired' | 'active' | 'pending';
