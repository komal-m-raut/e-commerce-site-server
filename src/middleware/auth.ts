import { Request, Response, NextFunction } from 'express';
import { validateToken } from '@src/services/auth.service';
import { BadRequestError, AuthFailureError } from '@src/utils/apiError';

interface Permission {
  [key: string]: any;
}

interface PermissionObject {
  userPermissions: Permission[];
  productPermissions: Permission[];
}

const authMiddleware =
  (permissions: PermissionObject, capacities: number) =>
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
      data: {
        userPermissions: Permission[];
        productPermissions: Permission[];
      };
    } = validateToken(token) as {
      isValid: boolean;
      message: string;
      data: {
        userPermissions: Permission[];
        productPermissions: Permission[];
      };
    };
    if (!decoded.isValid) {
      throw new AuthFailureError(decoded.message);
    }
    const hasRequiredUserPermissions = permissions.userPermissions.every(
      ({ key, value }) =>
        decoded.data.userPermissions.some(
          (permission) => permission.key === key && permission.value === value,
        ),
    );
    const hasRequiredProductPermissions = permissions.productPermissions.every(
      ({ key, value }) =>
        decoded.data.productPermissions.some(
          (permission) => permission.key === key && permission.value === value,
        ),
    );
    const hasRequiredCapacities = capacities >= 0;
    if (
      !hasRequiredUserPermissions ||
      !hasRequiredProductPermissions ||
      !hasRequiredCapacities
    ) {
      throw new AuthFailureError(`Unauthorized`);
    }
    req.body.decoded = decoded.data;
    return next();
  };

export default authMiddleware;
