export interface ILogger {
  log(msg: string): void;
  error(error: string | Error): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string): void {
    console.log(`[INFO] ${msg}`);
  }

  error(error: string | Error): void {
    console.log(`[ERROR] ${JSON.stringify(error)}`);
  }
}
