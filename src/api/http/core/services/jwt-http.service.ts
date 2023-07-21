import { FastifyRequest } from 'fastify';
import { inject, injectable } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';
import { JwtService } from '@infrastructure/crypto';
import { ILogger } from '@infrastructure/logger';

import { HttpUnauthorized } from '../http.errors';

export interface IDriverJwtPayload {
  email: string;
  id: string;
}

@injectable()
export class JwtHttpService {
  constructor(
    @inject(JwtService) private jwt: JwtService,
    @inject(AppConfig) private appConfig: AppConfig,
    @inject('ILogger') private logger: ILogger,
  ) {}

  async validateRequest<T extends IDriverJwtPayload>(req: FastifyRequest): Promise<T> {
    try {
      const token = req.headers['authorization']?.split(' ')[1];

      if (token == null) {
        throw new HttpUnauthorized('Token is missing');
      }

      const tokenValid = await this.jwt.verify(token, this.appConfig.JWT_SECRET);

      if (!tokenValid) {
        throw new HttpUnauthorized('Token verification failed');
      }

      return tokenValid as T;
    } catch (error) {
      this.logger.error(error as Error);

      throw new HttpUnauthorized('Token verification failed');
    }
  }

  async createToken<T extends IDriverJwtPayload>(payload: T): Promise<string> {
    const token = await this.jwt.sign(payload, this.appConfig.JWT_SECRET, {
      expiresIn: Date.now() + 15 * 60 * 1000,
    });

    return token as string;
  }
}
