import { HealthReport } from '@/modules/health/domain/entities/health-report';
import { INotificationStrategy } from './i-notification-strategy.provider';

export const IDiscordNotifier = Symbol('IDiscordNotifier');

export interface IDiscordNotifier {
  notify<T>(strategy: INotificationStrategy<T>, reports: T): Promise<void>;
}
