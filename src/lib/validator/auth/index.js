import InvariantError from "@/lib/exceptions/InvariantError";
import * as schema from "./schema";

export default class AuthValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostAuth(payload) {
    const { PostAuthSchema } = this.schema;

    const validationResult = PostAuthSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }

  validatePutAuth(payload) {
    const { PutAuthSchema } = this.schema;

    const validationResult = PutAuthSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}
