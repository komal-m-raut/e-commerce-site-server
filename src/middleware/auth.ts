import { Request, Response, NextFunction } from 'express';
import { validateToken } from '@src/services/auth.service';
import { BadRequestError, AuthFailureError } from '@src/utils/apiError';

const authMiddleware =
  (roleId = 100) =>
  (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Response<unknown, Record<string, unknown>> | void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new BadRequestError(`Token is missing`);
    }

    const decoded: {
      isValid: boolean;
      message: string;
      data: { roleId: number };
    } = validateToken(token) as {
      isValid: boolean;
      message: string;
      data: { roleId: number };
    };
    if (!decoded.isValid) {
      throw new AuthFailureError(decoded.message);
    }

    if (decoded.data.roleId >= roleId) {
      throw new AuthFailureError(`Unauthorized`);
    }
    req.body.decoded = decoded.data;
    return next();
  };

export default authMiddleware;
