interface APISilenceStatus {
  state: SilenceStateString;
}

type SilenceStateString = 'expired' | 'active' | 'pending';

export interface SilenceStatus {
  state: SilenceStateString;
}
