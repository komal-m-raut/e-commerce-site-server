import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION: Joi.number()
      .default('8h')
      .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default('30d')
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION: Joi.number()
      .default('30m')
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION: Joi.number()
      .default('30m')
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description(
      'the from field in the emails sent by the app',
    ),
    SENDGRID_API_KEY: Joi.string().required().description('SendGrid API key'),
    MONGOOSE_STRICT_MODE: Joi.boolean(),
    MSG_AUTH_KEY: Joi.string().description('MSG91 auth key'),
    MSG_SENDER_ID: Joi.string().description('MSG91 sender id'),
    MSG_ROUTE: Joi.number().description('MSG91 route'),
    MSG_COUNTRY: Joi.number().description('MSG91 country'),
    RAZORPAY_KEY_ID: Joi.string().description('Razorpay key id'),
    RAZORPAY_KEY_SECRET: Joi.string().description('Razorpay key secret'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      // useCreateIndex: true, Add if we want to add autoIndexing
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
    },
    strictQuery: envVars.MONGOOSE_STRICT_MODE,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    sendgridApi: envVars.SENDGRID_API_KEY,
    from: envVars.EMAIL_FROM,
  },
  msg: {
    authKey: envVars.MSG_AUTH_KEY,
    senderId: envVars.MSG_SENDER_ID,
    route: envVars.MSG_ROUTE,
    country: envVars.MSG_COUNTRY,
  },
  paymentGateway: {
    razorpay: {
      key_id: envVars.RAZORPAY_KEY_ID,
      key_secret: envVars.RAZORPAY_KEY_SECRET,
    },
  },
};

export default config;
