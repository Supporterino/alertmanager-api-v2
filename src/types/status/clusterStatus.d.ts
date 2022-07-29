interface APIClusterStatus {
  name?: string;
  status: StatusString;
  peers?: Array<APIPeerStatus>;
}
