export default interface ITokenManager {
  getRefresh(): string,
  getAccess(): string,
  setRefresh(refreshToken: string): void,
  setAccess(accessToken: string): void,
  refreshTokens(): Promise<boolean>,
}