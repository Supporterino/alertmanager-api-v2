import { APIAlert } from './alert';
import { APILabelSet } from './labelSet';

export interface PostableAlert extends APIAlert {
  startsAt?: string;
  endsAt?: string;
  annotations?: APILabelSet;
}
