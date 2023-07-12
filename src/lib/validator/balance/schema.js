import Joi from "joi";

export const PutBalanceSchema = Joi.object({
  amount: Joi.number().required().min(1).label("Amount"),
  type: Joi.string().required().valid("topup", "withdraw").label("Type"),
  method: Joi.string().required().label("Method"),
});
