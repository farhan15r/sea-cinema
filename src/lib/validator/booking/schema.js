import Joi from "joi";

export const PostBookingSchema = Joi.object({
  movieId: Joi.string().required().label("Movie ID"),
  date: Joi.string()
    .regex(
      /^(?:20[2-9][0-9]|2100)-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
    )
    .required()
    .label("Date"),
  time: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/)
    .required()
    .label("Time"),
  seats: Joi.array().items(Joi.number()).required().label("Seats"),
});
