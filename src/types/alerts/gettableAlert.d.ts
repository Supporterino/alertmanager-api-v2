import { Alert } from './alert';
import { AlertStatus } from './alertStatus';
import { LabelSet } from './labelSet';
import { Receiver } from './receiver';

export interface GettableAlert extends Alert {
  annotations: LabelSet;
  receivers: Array<Receiver>;
  fingerprint: string;
  startsAt: Date;
  updatedAt: Date;
  endsAt: Date;
  status: AlertStatus;
}
