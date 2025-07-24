import { HealthReport } from '@/modules/health/domain/entities/health-report';
import { INotificationStrategy } from '@/shared/domain/providers/i-notification-strategy.provider';

export class HealthCheckStrategy
  implements INotificationStrategy<HealthReport[]>
{
  format(reports: HealthReport[]): string {
    const content = reports
      .map(r => {
        const service = r.service?.toUpperCase?.() ?? 'SERVIÇO_DESCONHECIDO';
        const status = r.status?.toUpperCase?.() ?? 'STATUS_DESCONHECIDO';
        const error = r.errorMessage ?? 'sem erro detalhado';

        return `\n❌ ${service} - ${status}\nMensagem: ${error}`;
      })
      .join('/n');

    return `Falha nos serviços:\n ${content}`;
  }
}
