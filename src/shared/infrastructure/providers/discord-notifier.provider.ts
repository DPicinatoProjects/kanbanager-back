import axios from 'axios';
import { HealthReport } from '../../../modules/health/domain/entities/health-report';
import { ENV } from '@/configs/env.config';
import { IDiscordNotifier } from '@/shared/domain/providers/discord-notifier.provider';

export class DiscordNotifier implements IDiscordNotifier {
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
