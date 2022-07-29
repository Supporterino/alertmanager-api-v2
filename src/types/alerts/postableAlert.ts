interface PostableAlert extends APIAlert {
  startsAt?: string;
  endsAt?: string;
  annotations?: APILabelSet;
}
