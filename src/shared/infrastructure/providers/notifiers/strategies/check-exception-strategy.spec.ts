import { ErrorReport } from '@/shared/presentation/dtos/error-report.dto';
import { ExceptionStrategy } from './check-exception-strategy';

describe('ExceptionStrategy', () => {
  it('should format error', () => {
    const strategy = new ExceptionStrategy();

    const error = new Error('Algo deu errado');
    const errorReport = new ErrorReport(
      error.message,
      error.name,
      error.stack,
      new Date(),
      { context: 'UserModule' },
    );
    const result = strategy.format(errorReport);

    expect(result).toContain('Algo deu errado');
    expect(result).toContain('UserModule');
  });

  it('should handler error without stack trace', () => {
    const strategy = new ExceptionStrategy();

    const context = 'Context';
    const errorReport = new ErrorReport('Erro sem stack', 'ErrorSemStack');
    const result = strategy.format(errorReport);

    expect(result).toContain('Erro sem stack');
  });
});
