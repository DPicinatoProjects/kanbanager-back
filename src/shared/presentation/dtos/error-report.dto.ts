export class ErrorReport {
  constructor(
    public readonly message: string,
    public readonly name: string,
    public readonly stack?: string,
    public readonly timestamp: Date = new Date(),
    public readonly context?: Record<string, any>,
  ) {}

  toDiscordMessage(): string {
    return (
      `🚨 **${this.name}**\n` +
      `🕒 ${this.timestamp.toISOString()}\n` +
      `📝 ${this.message}\n` +
      (this.stack ? `\`\`\`${this.stack}\`\`\`` : '') +
      (this.context
        ? `📦 Contexto:\n\`\`\`json\n${JSON.stringify(this.context, null, 2)}\n\`\`\``
        : '')
    );
  }
}
