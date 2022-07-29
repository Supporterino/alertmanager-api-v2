import { APISilence } from './silence';
import { APISilenceStatus } from './silenceStatus';
export interface APIGettableSilence extends APISilence {
  id: string;
  status: APISilenceStatus;
  updatedAt: string;
}
