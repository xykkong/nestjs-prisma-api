import * as Joi from 'joi';

export class SignUpDto {
  name: string;
  password: string;
  email: string;
}

export const SignUpSchema = Joi.object({
  name: Joi.string().max(100).required(),
  password: Joi.string().min(6).max(20).required(),
  email: Joi.string().email().required(),
}).options({
  abortEarly: false,
});
