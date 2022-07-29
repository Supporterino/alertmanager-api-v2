interface APIAlertmanagerStatus {
  cluster: APIClusterStatus;
  versionInfo: APIVersionInfo;
  config: APIAlertmanagerConfig;
  uptime: string;
}
