interface APISilenceStatus {
  state: SilenceStateString;
}

type SilenceStateString = 'expired' | 'active' | 'pending';
