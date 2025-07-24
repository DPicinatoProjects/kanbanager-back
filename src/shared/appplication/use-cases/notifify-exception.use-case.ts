import { DiscordNotifier } from '@/shared/infrastructure/providers/notifiers/discord-notifier.provider';
import { ExceptionStrategy } from '@/shared/infrastructure/providers/notifiers/strategies/check-exception-strategy';
import { ErrorReport } from '@/shared/presentation/dtos/error-report.dto';

export class NotifyExceptionUseCase {
  constructor(private readonly notifier: DiscordNotifier) {}

  async execute(error: ErrorReport): Promise<void> {
    const strategy = new ExceptionStrategy();
    await this.notifier.notify(strategy, error);
  }
}
