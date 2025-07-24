import { IDiscordNotifier } from '@/shared/domain/providers/i-discord-notifier.provider';
import { GlobalHttpExceptionFilter } from './global-http-exception.filter';
import { ArgumentsHost, HttpException } from '@nestjs/common';
import { ErrorReport } from '../dtos/error-report.dto';
import { ExceptionStrategy } from '@/shared/infrastructure/providers/notifiers/strategies/check-exception-strategy';

describe('GlobalHttpExceptionFilter', () => {
  let filter: GlobalHttpExceptionFilter;
  let notifier: IDiscordNotifier;

  const mockHost = {
    switchToHttp: () => ({
      getRequest: () => ({ method: 'GET', url: '/rota' }),
      getResponse: () => ({
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }),
    }),
  } as ArgumentsHost;

  beforeEach(() => {
    notifier = {
      notify: jest.fn(),
    };
    filter = new GlobalHttpExceptionFilter(notifier);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not notify Discord for comum HttpException', async () => {
    const exception = new HttpException('Bad Rwquest', 400);

    await filter.catch(exception, mockHost);

    expect(notifier.notify).not.toHaveBeenCalled();
  });

  it('should notify Discord with a unespected error', async () => {
    const err = new Error('Erro grave');

    await filter.catch(err, mockHost);

    expect(notifier.notify).toHaveBeenCalledWith(
      expect.any(ExceptionStrategy),
      expect.objectContaining({ message: 'Erro grave' }),
    );
  });

  it('should log and continue the response normally', async () => {
    const res = mockHost.switchToHttp().getResponse();
    const exception = new Error('Erro inesperado');

    await filter.catch(exception, mockHost);

    // O filtro só notifica, não envia resposta HTTP
    expect(notifier.notify).toHaveBeenCalledWith(
      expect.any(ExceptionStrategy),
      expect.objectContaining({ message: 'Erro inesperado' }),
    );
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
