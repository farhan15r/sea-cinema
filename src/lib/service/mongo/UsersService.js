import database from "@/db/mongo";
import bcrypt from "bcrypt";
import ClientError from "@/lib/exceptions/ClientError";
import ServerError from "@/lib/exceptions/ServerError";
import NotFoundError from "@/lib/exceptions/NotFoundError";

export default class UsersService {
  constructor() {
    this.userCollection = database.collection("users");
  }

  async checkUsernameAvailable(username) {
    const user = await this.userCollection.findOne({ username });

    if (user) {
      throw new ClientError("Username already taken");
    }
  }

  async addUser({ username, age, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userCollection.insertOne({
        username,
        age,
        password: hashedPassword,
        balance: 0,
      });

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      throw new ServerError("Failed to add user");
    }
  }

  async getUser(username) {
    const user = await this.userCollection.findOne({ username });

    if (!user) {
      throw new NotFoundError("Invalid username or password");
    }

    return user;
  }

  async validateCredentials(password, userPassword) {
    const isValid = await bcrypt.compare(password, userPassword);

    if (!isValid) {
      throw new NotFoundError("Invalid username or password");
    }
  }

  async getBalance(username) {
    const user = await this.getUser(username);

    return user.balance;
  }

  async updateBalance(username, amount, type, method) {
    const user = await this.getUser(username);

    const currentBalance = user.balance;

    const newBalance =
      type === "topup" ? currentBalance + amount : currentBalance - amount;

    const history = {
      type: type === "topup" ? "in" : "out",
      amount,
      description: `${type} via ${method}`,
      date: new Date(),
    };

    try {
      const result = await this.userCollection.updateOne(
        { username, balance: currentBalance },
        {
          $set: { balance: newBalance },
          $push: { histories: history },
        }
      );

      if (result.modifiedCount === 0) {
        throw new ServerError("Failed to update balance");
      }

      return newBalance;
    } catch (error) {
      throw new ServerError("Failed to update balance");
    }
  }

  async getHistories(username) {
    const user = await this.getUser(username);

    return user.histories;
  }
}
