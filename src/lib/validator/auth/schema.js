import Joi from "joi";

export const PostAuthSchema = Joi.object({
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .required()
    .label("Username"),
  password: Joi.string().required().label("Password"),
});

export const PutAuthSchema = Joi.object({
  refreshToken: Joi.string().required().label("Refresh Token"),
});
