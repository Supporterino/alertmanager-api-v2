export type SilenceStateString = 'expired' | 'active' | 'pending';

export interface SilenceStatus {
  state: SilenceStateString;
}
