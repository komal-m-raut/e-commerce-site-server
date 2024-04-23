import { Request, Response, NextFunction } from 'express';
import { validateToken } from '@src/services/auth.service';
import { BadRequestError, AuthFailureError } from '@src/utils/apiError';

interface Permission {
  [key: string]: any;
}

interface PermissionObject {
  userPermissions: Permission;
  productPermissions: Permission;
}

const defaultPermissions: PermissionObject = {
  userPermissions: {},
  productPermissions: {},
};

const authMiddleware =
  (permissions: PermissionObject = defaultPermissions) =>
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
        id: string;
        userType: string;
        userPermissions: Permission;
        productPermissions: Permission;
      };
    } = validateToken(token) as {
      isValid: boolean;
      message: string;
      data: {
        id: string;
        userType: string;
        userPermissions: Permission;
        productPermissions: Permission;
      };
    };
    if (!decoded.isValid) {
      throw new AuthFailureError(decoded.message);
    }
    console.log(permissions, 'permissions');
    console.log(decoded.data, 'decoded');
    const hasRequiredUserPermissions = Object.keys(
      permissions.userPermissions,
    ).every(
      (key) =>
        decoded.data.userPermissions[key] === permissions.userPermissions[key],
    );
    const hasRequiredProductPermissions = Object.keys(
      permissions.productPermissions,
    ).every(
      (key) =>
        decoded.data.productPermissions[key] === permissions.productPermissions[key],
    );

    console.log(
      hasRequiredUserPermissions,
      hasRequiredProductPermissions,
      'permissions',
    );
    if (!hasRequiredUserPermissions || !hasRequiredProductPermissions) {
      throw new AuthFailureError(`Unauthorized`);
    }
    req.body.decoded = decoded.data;
    return next();
  };

export default authMiddleware;
