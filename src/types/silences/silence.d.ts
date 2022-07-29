import { Matcher } from './matcher';

export interface Silence {
  matchers: Array<Matcher>;
  startsAt: Date;
  endsAt: Date;
  createdBy: string;
  comment: string;
}
