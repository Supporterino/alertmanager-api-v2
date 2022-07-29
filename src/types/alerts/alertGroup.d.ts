import { GettableAlert } from './gettableAlert';
import { LabelSet } from './labelSet';
import { Receiver } from './receiver';

export interface AlertGroup {
  labels: LabelSet;
  receiver: Receiver;
  alerts: Array<GettableAlert>;
}
