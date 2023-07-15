import { JWTService } from "@infrastructure/crypto";
import { container } from "tsyringe";
import { NotAuthorized } from "./errors";

export function Authorize(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const jwtService = container.resolve(JWTService);

  descriptor.value = async function (req: Request, res: Response) {
    const headers = JSON.parse(JSON.stringify(req.headers));
    const token = headers["authorization"];

    if (token == null) {
      throw new NotAuthorized();
    }

    const tokenValid = await jwtService.verify(token, "secret");

    if (!tokenValid) {
      throw new NotAuthorized();
    }

    return originalMethod.apply(this, [req, res]);
  };

  return descriptor;
}
