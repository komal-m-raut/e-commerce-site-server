import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AuthRequest extends Request {
  user?: object | string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Response<unknown, Record<string, unknown>> | void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
};

export default authMiddleware;
