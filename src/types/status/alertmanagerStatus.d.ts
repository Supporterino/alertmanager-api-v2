import { AlertmanagerConfig } from './alertmanagerConfig';
import { ClusterStatus } from './clusterStatus';
import { VersionInfo } from './versionInfo';

export interface AlertmanagerStatus {
  cluster: ClusterStatus;
  versionInfo: VersionInfo;
  config: AlertmanagerConfig;
  uptime: Date;
}
