/* INFO: not using jsonwebtoken as it doesn't support edge runtime to be able to verify token in middleware  */
import { SignJWT, jwtVerify } from 'jose';

import { User } from '../../../prisma/generated';

import { JWTPayload } from './../../../node_modules/jose/dist/types/types.d';

export const JWT_EXPIRATION_TIME = '6h';
export const JWT_REMEMBER_ME_EXPIRATION_TIME = '1d';

// Define the UserJWTPayload type
interface UserJWTPayload {
  id: string;
}

class JWTClient {
  private static instance: JWTClient;

  private readonly secret = new TextEncoder().encode(
    process.env.SESSION_SECRET || ''
  );

  private constructor() {
    if (!this.secret) {
      throw new Error('JWTService: Cannot find secret');
    }
  }

  static getInstance() {
    if (!JWTClient.instance) {
      JWTClient.instance = new JWTClient();
    }

    return JWTClient.instance;
  }

  encrypt(
    payload: Pick<User, 'id'>,
    options: { rememberMe?: boolean } = {}
  ): Promise<string> {
    const { rememberMe } = options;
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(
        rememberMe ? JWT_REMEMBER_ME_EXPIRATION_TIME : JWT_EXPIRATION_TIME
      )
      .sign(this.secret);
  }

  async decrypt(
    token: string
  ): Promise<(JWTPayload & UserJWTPayload) | undefined> {
    if (!token) {
      return;
    }
    try {
      const { payload } = await jwtVerify(token, this.secret, {
        algorithms: ['HS256'],
      });
      return payload as JWTPayload & UserJWTPayload;
    } catch (error) {
      console.error('JWTService: Failed to verify payload.', error);
    }
  }
}

export const JWTService = JWTClient.getInstance();
