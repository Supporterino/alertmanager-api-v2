import { AlertmanagerConfig } from './alertmanagerConfig';
import { ClusterStatus } from './clusterStatus';
import { VersionInfo } from './versionInfo';

export interface APIAlertmanagerStatus {
  cluster: ClusterStatus;
  versionInfo: VersionInfo;
  config: AlertmanagerConfig;
  uptime: string;
}
