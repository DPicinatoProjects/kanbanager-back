export class HealthReport {
  constructor(
    public readonly service: string,
    public readonly status: 'up' | 'down',
    public readonly respondeTimeMs?: number,
    public readonly errorMessage?: string,
  ) {}

  isHealthy(): boolean {
    return this.status === 'up';
  }
}
