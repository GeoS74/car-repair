export default interface IObserverPattern {
  subscribe(componentKey: string): void
  unsubscribe(componentKey: string): void
}