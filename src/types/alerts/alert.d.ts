import { LabelSet } from './labelSet';

export interface Alert {
  labels: LabelSet;
  generatorURL?: string;
}
