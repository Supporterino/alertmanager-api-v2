import { APIMatcher } from './matcher';
export interface APISilence {
  matchers: Array<APIMatcher>;
  startsAt: string;
  endsAt: string;
  createdBy: string;
  comment: string;
}
