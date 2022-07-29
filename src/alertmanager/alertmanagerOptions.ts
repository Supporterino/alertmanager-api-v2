import { Matcher } from '../silences/matcher';

export interface AlertmanagerOptions {
  auth?: BasicAuth;
}

export interface BasicAuth {
  username: string;
  password: string;
}

export interface CreateSilence {
  matchers: Array<Matcher>;
  startsAt: Date;
  endsAt: Date;
  createdBy: string;
  comment: string;
}

export interface UpdateSilence extends CreateSilence {
  id: string;
}

export interface CreateSilenceResponse {
  silenceID: string;
}
