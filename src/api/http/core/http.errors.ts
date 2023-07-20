export class AppError implements Error {
  name: string;
  message: string;
  status: number;
  stack?: string | undefined;

  constructor(name: string, message: string, status: number) {
    this.name = name;
    this.message = message;
    this.status = status;

    // because we are extending the built-in class
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class Unauthorized extends AppError {
  constructor(message = 'Unauthorized') {
    super('Unauthorized', message, 401);
  }
}

export class NotFound extends AppError {
  constructor(message = 'NotFound') {
    super('NotFound', message, 404);
  }
}

export class BadRequest extends AppError {
  constructor(message = 'Bad Request') {
    super('BadRequest', message, 400);
  }
}
