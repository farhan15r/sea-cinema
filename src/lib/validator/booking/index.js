import InvariantError from "@/lib/exceptions/InvariantError";
import * as schema from "./schema";

export default class BookingValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostBooking(payload) {
    const { PostBookingSchema } = this.schema;

    const validationResult = PostBookingSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}
