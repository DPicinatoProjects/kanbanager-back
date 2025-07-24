import axios from 'axios';
import { ENV } from '@/configs/env.config';
import { IDiscordNotifier } from '@/shared/domain/providers/i-discord-notifier.provider';
import { INotificationStrategy } from '@/shared/domain/providers/i-notification-strategy.provider';
import { Logger } from '@nestjs/common';

export class DiscordNotifier implements IDiscordNotifier {
  private readonly logger = new Logger(DiscordNotifier.name);

  async notify<T>(strategy: INotificationStrategy<T>, data: T): Promise<void> {
    try {
      const content = strategy.format(data);
      await axios.post(ENV.DISCORD_WEBHOOK_URL, {
        content,
      });
    } catch (error) {
      this.logger.error('Erro ao enviar notificação para o Discord', error);
    }
  }
}
