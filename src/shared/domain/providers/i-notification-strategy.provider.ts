export interface INotificationStrategy<T> {
  format(data: T): string;
}
