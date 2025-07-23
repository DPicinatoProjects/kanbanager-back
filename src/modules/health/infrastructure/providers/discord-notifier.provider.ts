import axios from 'axios';
import { HealthReport } from '../../domain/entities/health-report';
import { ENV } from '@/configs/env.config';

export class DiscordNotifier {
  async notify(reports: HealthReport[]): Promise<void> {
    const content = reports
      .map(r => {
        const service = r.service?.toUpperCase?.() ?? 'SERVIÇO_DESCONHECIDO';
        const status = r.status?.toUpperCase?.() ?? 'STATUS_DESCONHECIDO';
        const error = r.errorMessage ?? 'sem erro detalhado';

        return `❌ ${service} - ${status}\nMensagem: ${error}`;
      })
      .join('/n');

    await axios.post(ENV.DISCORD_WEBHOOK_URL, {
      content: `Falha nos serviços:\n ${content}`,
    });
  }
}
