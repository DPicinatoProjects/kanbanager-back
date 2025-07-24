import axios from 'axios';
import { DiscordNotifier } from './discord-notifier.provider';
import { ExceptionStrategy } from './strategies/check-exception-strategy';
import { ErrorReport } from '@/shared/presentation/dtos/error-report.dto';

jest.mock('axios');

describe('DiscordNotifier', () => {
  const notifier = new DiscordNotifier();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send the format content to the Discord webhook', async () => {
    // Arrange
    const error = new Error('Erro crítico');
    const errorReport = new ErrorReport(
      error.message,
      error.name,
      error.stack,
      new Date(),
      { context: 'AppModule' },
    );

    // Act
    await notifier.notify(new ExceptionStrategy(), errorReport);

    // Assert
    expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
      content: expect.stringContaining('📝 Erro crítico'),
    });
  });

  it('should log the error if sending fails', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(
      new Error('Falha ao envio'),
    );
    // Arrange
    const error = new Error('Erro');
    const errorReport = new ErrorReport(
      error.message,
      error.name,
      error.stack,
      new Date(),
      { context: 'AppModule' },
    );

    const loggerErrorSpy = jest
      .spyOn(require('@nestjs/common').Logger.prototype, 'error')
      .mockImplementation();

    // Act
    await notifier.notify(new ExceptionStrategy(), errorReport);

    // Assert
    expect(loggerErrorSpy).toHaveBeenCalled();
    // Testando a contuedo do log de erro
    expect(loggerErrorSpy).toHaveBeenCalledWith(
      'Erro ao enviar notificação para o Discord',
      expect.any(Error),
    );

    loggerErrorSpy.mockRestore();
  });
});
