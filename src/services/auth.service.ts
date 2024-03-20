import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '@src/config/config';

// Generate a JWT token
export const generateToken = (data: Record<string, unknown>): string => {
  const secret = config.jwt.secret || 'default_secret'; // Replace with your own JWT secret
  const expiresIn = config.jwt.accessExpirationMinutes ?? '8h'; // Token expiration time (8 hours)
  const payload = data; // Token payload
  return jwt.sign(payload, secret, { expiresIn });
};

// Validate a JWT token
export const validateToken = (token: string): Record<string, unknown> => {
  try {
    const secret = config.jwt.secret || 'default_secret'; // Replace with your own JWT secret
    const decoded = jwt.verify(token, secret) as Record<string, unknown>;
    return { isValid: true, data: decoded };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return { isValid: false, message: 'TokenExpiredError' };
    }
    return { isValid: false, message: 'Invalid token' };
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
