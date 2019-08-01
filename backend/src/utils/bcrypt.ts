import { hash as bhash, compare as bcompare } from 'bcrypt';

const saltRounds = 10;

export async function hash(plain: string): Promise<string> {
  return bhash(plain, saltRounds);
}

export async function compare(plain: string, hashed: string): Promise<boolean> {
  return bcompare(plain, hashed);
}
