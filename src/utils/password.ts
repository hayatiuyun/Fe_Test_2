import { hash, compare } from 'bcrypt-ts';

const saltRounds = 10;

// Function to hash a password
export async function hashPassword(password: string): Promise<string> {
  return await hash(password, saltRounds);
}

// Function to verify a password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}
