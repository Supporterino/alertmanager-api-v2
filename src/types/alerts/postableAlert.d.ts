import { Alert } from './alert';
import { LabelSet } from './labelSet';

export interface PostableAlert extends Alert {
  startsAt?: Date;
  endsAt?: Date;
  annotations?: LabelSet;
}
