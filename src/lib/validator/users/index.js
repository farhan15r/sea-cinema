import InvariantError from "@/lib/exceptions/InvariantError";
import * as schema from "./schema";

export default class UsersValidator {
  constructor() {
    this.schema = schema;
  }

  validatePostUser(payload) {
    const { PostUsersSchema } = this.schema;

    const validationResult = PostUsersSchema.validate(payload);

    if (payload.password !== payload.retypePassword) {
      validationResult.error = new Error('"Password" doesn\'t match');
    }

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}
