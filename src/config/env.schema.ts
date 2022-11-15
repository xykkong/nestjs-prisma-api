import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('DEV', 'PROD', 'TEST').default('DEV'),
  APP_PORT: Joi.number().default(3000),
  JWT_EXP_H: Joi.string().default('1h'),
  DATABASE_URL: Joi.string(),
});
