import { injectable } from "tsyringe";
import bcrypt from "bcrypt";

@injectable()
export class BcryptService {
  async compare(password: string | Buffer, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(err);
        }

        resolve(same);
      });
    });
  }
}
