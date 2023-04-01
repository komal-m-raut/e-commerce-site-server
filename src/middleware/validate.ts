import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

interface ValidationSchema {
  [key: string]: Joi.Schema;
}

const validate =
  (schema: ValidationSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Response<unknown, Record<string, unknown>> | void => {
    const options = {
      abortEarly: false, // Return all validation errors, not just the first one
      allowUnknown: true, // Allow unknown properties in the request body
    };

    const { error } = Joi.object(schema).validate(req, options);
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({ message: errors.join(', ') });
    }

    return next();
  };

export default validate;
