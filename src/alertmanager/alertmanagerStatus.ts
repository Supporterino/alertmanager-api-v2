import { APIAlertmanagerStatus } from '../types/status/alertmanagerStatus';

export interface AlertmanagerStatus extends Omit<APIAlertmanagerStatus, 'uptime'> {
  uptime: Date;
}
