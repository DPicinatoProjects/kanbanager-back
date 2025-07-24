import { IDiscordNotifier } from '@/shared/domain/providers/i-discord-notifier.provider';
import { ExceptionStrategy } from '@/shared/infrastructure/providers/notifiers/strategies/check-exception-strategy';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject(IDiscordNotifier)
    private readonly notifier: IDiscordNotifier,
  ) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<FastifyReply>();

    if (exception instanceof HttpException) {
      return;
    }
    await this.notifier.notify(new ExceptionStrategy(), exception);
  }
}
