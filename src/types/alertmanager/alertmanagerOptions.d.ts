export interface AlertmanagerOptions {
  auth?: BasicAuth;
}

export interface BasicAuth {
  username: string;
  password: string;
}
