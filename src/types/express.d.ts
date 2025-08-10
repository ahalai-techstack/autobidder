import { JwtPayload } from '../modules/auth/types/jwt-payload.type';

declare module 'express' {
  interface Request {
    user?: JwtPayload;
  }
}
