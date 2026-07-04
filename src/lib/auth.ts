import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_node_aura';

export interface TokenPayload {
  userId: string;
  role: string;
  clinicId: string;
}

export const authLib = {
  signToken(payload: TokenPayload, expiresIn: jwt.SignOptions['expiresIn'] = '7d'): string {
    const options = { expiresIn } as jwt.SignOptions;
    return jwt.sign(payload, JWT_SECRET as jwt.Secret, options);
  },

  verifyToken(token: string): TokenPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch {
      return null;
    }
  },

  hashSimplePin(pin: string): string {
    // Light obfuscation helper or interface hook for bcrypt
    return Buffer.from(pin).toString('base64');
  }
};