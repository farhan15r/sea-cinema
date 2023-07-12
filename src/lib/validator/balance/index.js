import InvariantError from "@/lib/exceptions/InvariantError";
import * as schema from "./schema";

export default class BalanceValidator {
  constructor() {
    this.schema = schema;
  }

  validatePutBalance(payload) {
    const { PutBalanceSchema } = this.schema;
    const validationResult = PutBalanceSchema.validate(payload);

    if (payload.type === "withdraw" && payload.amount > 500000) {
      throw new InvariantError("Maximum withdraw amount is 500000");
    }

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  }
}
