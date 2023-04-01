import { Request, Response, NextFunction } from 'express';

type catchAsync = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<unknown>;

export default (execution: catchAsync) =>
  (req: Request, res: Response, next: NextFunction): void => {
    execution(req, res, next).catch(next);
  };
