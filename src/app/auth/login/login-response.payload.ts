export interface LoginResponsePayload {
  username: string;
  refreshToken: string;
  authenticationToken: string;
  expireAt: Date;
}
