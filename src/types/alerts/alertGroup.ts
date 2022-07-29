interface AlertGroup {
  labels: APILabelSet;
  receiver: APIReceiver;
  alerts: Array<APIGettableAlert>;
}
