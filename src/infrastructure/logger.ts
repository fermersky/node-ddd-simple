export interface ILogger {
  log(msg: string): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string): void {
    console.log(`[INFO] ${msg}`);
  }
}
