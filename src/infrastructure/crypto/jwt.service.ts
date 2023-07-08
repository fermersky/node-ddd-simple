import * as jwt from "jsonwebtoken";
import { injectable } from "tsyringe";

@injectable()
export class JWTService {
  /**
   * **Asynchronously** sign the given payload into a JSON Web Token string
   * @param payload - Payload to sign, could be an literal, buffer or string
   * @param secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
   * @param [options] - Options for the signature
   */
  public async sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret,
    options: jwt.SignOptions
  ): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secretOrPrivateKey, options, (error, encoded) => {
        if (error) {
          reject(error);
        }

        resolve(encoded);
      });
    });
  }
}
