import { APIGettableAlert } from './gettableAlert';
import { APILabelSet } from './labelSet';
import { Receiver } from './receiver';

export interface AlertGroup {
  labels: APILabelSet;
  receiver: Receiver;
  alerts: Array<APIGettableAlert>;
}
