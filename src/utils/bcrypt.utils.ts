import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = await Number(process.env.SALT_ROUNDS);
  console.log(`Env vars:`);
  console.log(process.env.SALT_ROUNDS);
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
