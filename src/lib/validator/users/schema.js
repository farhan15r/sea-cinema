import Joi from "joi";

export const PostUsersSchema = Joi.object({
  fullName: Joi.string().required().label("Full Name"),
  username: Joi.string()
    .regex(/^[a-zA-Z0-9_]+$/)
    .required()
    .label("Username"),
  age: Joi.number().required().min(1).label("Age"),
  password: Joi.string().required().label("Password"),
});
