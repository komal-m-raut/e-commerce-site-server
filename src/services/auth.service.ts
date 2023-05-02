import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '@src/config/config';

// Generate a JWT token
export const generateToken = (data: Record<string, unknown>): string => {
  const secret = config.jwt.secret || 'default_secret'; // Replace with your own JWT secret
  const expiresIn = config.jwt.accessExpirationMinutes; // Token expiration time
  const payload = data; // Token payload
  return jwt.sign(payload, secret, { expiresIn });
};

// Validate a JWT token
export const validateToken = (
  token: string,
): Record<string, unknown> | null => {
  try {
    const secret = config.jwt.secret || 'default_secret'; // Replace with your own JWT secret
    const decoded = jwt.verify(token, secret) as Record<string, unknown>;
    return decoded;
  } catch (err) {
    return null;
  }
};

// Encrypt using bcrypt
export const encrypt = async (plaintext: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(plaintext, saltRounds);
};

// Compare plaintext with hashed in the database
export const decrypt = async (
  plaintext: string,
  hashedText: string,
): Promise<boolean> => {
  return await bcrypt.compare(plaintext, hashedText);
};
