import { Silence } from './silence';
import { SilenceStatus } from './silenceStatus';

export interface GettableSilence extends Silence {
  id: string;
  status: SilenceStatus;
  updatedAt: Date;
}
