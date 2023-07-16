import { FastifyRequest } from 'fastify';
import { JsonWebTokenError } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';
import { JwtService } from '@infrastructure/crypto';

import { NotAuthorized } from '../errors';

export interface IDriverJwtPayload {
  email: string;
  id: string;
}

@injectable()
export class JwtHttpService {
  constructor(
    @inject(JwtService) private jwt: JwtService,
    @inject(AppConfig) private appConfig: AppConfig,
  ) {}

  async validateRequest<T extends IDriverJwtPayload>(req: FastifyRequest): Promise<T> {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token == null) {
      throw new NotAuthorized();
    }

    const tokenValid = await this.jwt.verify(token, this.appConfig.JWT_SECRET);

    if (!tokenValid) {
      throw new NotAuthorized();
    }

    return tokenValid as T;
  }

  async createToken<T extends IDriverJwtPayload>(payload: T): Promise<string> {
    const token = await this.jwt.sign(payload, this.appConfig.JWT_SECRET, {
      expiresIn: Date.now() + 15 * 60 * 1000,
    });

    return token as string;
  }
}
