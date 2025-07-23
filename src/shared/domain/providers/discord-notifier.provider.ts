import { HealthReport } from '@/modules/health/domain/entities/health-report';

export const IDiscordNotifier = Symbol('IDiscordNotifier');

export interface IDiscordNotifier {
  notify(reports: HealthReport[]): Promise<void>;
}
