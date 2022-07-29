import { APIAlert } from './alert';
import { APIAlertStatus } from './alertStatus';
import { APILabelSet } from './labelSet';
import { Receiver } from './receiver';

export interface APIGettableAlert extends APIAlert {
  annotations: APILabelSet;
  receivers: Array<Receiver>;
  fingerprint: string;
  startsAt: string;
  updatedAt: string;
  endsAt: string;
  status: APIAlertStatus;
}
