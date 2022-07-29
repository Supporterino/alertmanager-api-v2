import { APILabelSet } from './labelSet';

export interface APIAlert {
  labels: APILabelSet;
  generatorURL?: string;
}
