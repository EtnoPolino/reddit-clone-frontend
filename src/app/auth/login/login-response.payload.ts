export interface LoginResponse {
  username: string;
  refreshToken: string;
  authenticateToken: string;
  expireAt: Date;
}
