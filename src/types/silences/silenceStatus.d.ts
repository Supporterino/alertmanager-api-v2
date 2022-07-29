interface APISilenceStatus {
  state: SilenceStateString;
}

type SilenceStateString = 'expired' | 'active' | 'pending';

interface SilenceStatus {
  state: SilenceStateString;
}
