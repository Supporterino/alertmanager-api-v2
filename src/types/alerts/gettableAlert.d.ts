interface APIGettableAlert extends APIAlert {
  annotations: APILabelSet;
  receivers: Array<APIReceiver>;
  fingerprint: string;
  startsAt: string;
  updatedAt: string;
  endsAt: string;
  status: APIAlertStatus;
}
