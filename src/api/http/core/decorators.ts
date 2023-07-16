import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { AppConfig } from '@infrastructure/app.config';
import { JWTService } from '@infrastructure/crypto';

import { NotAuthorized } from './errors';

export function Authorize(target: any, propertyName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const jwtService = container.resolve(JWTService);
  const appConfig = container.resolve(AppConfig);

  descriptor.value = async function (req: FastifyRequest, res: FastifyReply) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (token == null) {
      throw new NotAuthorized();
    }

    const tokenValid = await jwtService.verify(token, appConfig.JWT_SECRET);

    if (!tokenValid) {
      throw new NotAuthorized();
    }

    return originalMethod.apply(this, [req, res]);
  };

  return descriptor;
}
