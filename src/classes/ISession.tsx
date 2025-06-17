export default interface ISession {
  start(): null
  close(): null
  getMe(): IUser | undefined
}