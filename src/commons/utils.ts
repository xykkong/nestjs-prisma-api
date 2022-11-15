import * as bcrypt from 'bcrypt';
import { Optional } from './types';

export async function generateHash(password: string): Promise<string> {
  return bcrypt.hashSync(password, 10);
}

export async function validateHash(
  password: Optional<string>,
  hash: Optional<string>,
): Promise<boolean> {
  if (!password || !hash) {
    return Promise.resolve(false);
  }

  return bcrypt.compare(password, hash);
}
