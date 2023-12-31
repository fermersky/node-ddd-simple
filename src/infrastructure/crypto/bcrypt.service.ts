import bcrypt from 'bcrypt';
import { injectable } from 'tsyringe';

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
