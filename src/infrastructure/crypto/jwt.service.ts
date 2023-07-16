import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

@injectable()
export class JwtService {
  /**
   * **Asynchronously** sign the given payload into a JSON Web Token string
   * @param payload - Payload to sign, could be an literal, buffer or string
   * @param secretOrPrivateKey - Either the secret for HMAC algorithms, or the PEM encoded private key for RSA and ECDSA.
   * @param [options] - Options for the signature
   */
  public async sign(
    payload: string | Buffer | object,
    secretOrPrivateKey: jwt.Secret,
    options: jwt.SignOptions,
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
  /**
   * Asynchronously verify given token using a secret or a public key to get a decoded token
   * @param token - JWT string to verify
   * @param secretOrPublicKey - A string or buffer containing either the secret for HMAC algorithms,
   * or the PEM encoded public key for RSA and ECDSA. If jwt.verify is called asynchronous,
   */
  public async verify(
    token: string,
    secretOrPublicKey: jwt.Secret | jwt.GetPublicKeyOrSecret,
  ): Promise<string | jwt.JwtPayload | undefined> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretOrPublicKey, (error, encoded) => {
        if (error) {
          resolve(undefined);
        }

        resolve(encoded);
      });
    });
  }
}
