import express, { Request, Response } from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import { ApiError, InternalError } from './utils/apiError';
import { rateLimiter } from './utils/rateLimiter';
import config from './config/config';
import logger from './utils/logger';
import { errorHandler, successHandler } from './config/morgan';
import router from './routes/v1/routes';

const app = express();

if (config.env !== 'test') {
  app.use(successHandler);
  app.use(errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors({ origin: true, optionsSuccessStatus: 200 }));

// limit repeated failed requests to public endpoints
if (config.env === 'production') {
  app.use('/v1/public/*', rateLimiter);
}

// v1 api routes
app.use('/v1', router);
app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/images/icons/gear.png', (req, res) => res.status(204));

// send back a 404 error for any unknown api request
app.use((err: Error, _req: Request, res: Response) => {
  console.log('fuck', err);
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (config.env === 'development') {
      logger.info(err);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;
