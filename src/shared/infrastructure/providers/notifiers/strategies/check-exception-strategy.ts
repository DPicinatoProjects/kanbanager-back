import { INotificationStrategy } from '@/shared/domain/providers/i-notification-strategy.provider';
import { ErrorReport } from '@/shared/presentation/dtos/error-report.dto';

export class ExceptionStrategy implements INotificationStrategy<ErrorReport> {
  format(error: ErrorReport): string {
    return (
      `🚨 **${error.name}**\n` +
      `🕒 ${error.timestamp.toISOString()}\n` +
      `📝 ${error.message}\n` +
      (error.stack ? `\`\`\`${error.stack}\`\`\`` : '') +
      (error.context
        ? `📦 Contexto:\n\`\`\`json\n${JSON.stringify(error.context, null, 2)}\n\n\`\`\``
        : '')
    );
  }
}
