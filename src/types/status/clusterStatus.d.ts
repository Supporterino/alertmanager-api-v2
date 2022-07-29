import { PeerStatus } from './peerStatus';
import { StatusString } from './statusString';

export interface ClusterStatus {
  name?: string;
  status: StatusString;
  peers?: Array<PeerStatus>;
}
