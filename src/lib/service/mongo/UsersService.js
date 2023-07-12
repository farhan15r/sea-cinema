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

    if (user) throw new ClientError("Username already taken");

    return;
  }

  async addUser({ fullName, username, age, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userCollection.insertOne({
      fullName,
      username,
      age,
      password: hashedPassword,
      balance: 0,
    });

    console.log("user", user);
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

    if (newBalance < 0) throw new ClientError("Balance is not enough");

    const history = {
      type: type === "topup" ? "in" : "out",
      amount,
      description: `${type} via ${method}`,
      date: new Date(),
    };

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
  }

  async getHistories(username) {
    const sortedHistories = await this.userCollection
      .aggregate([
        { $match: { username } }, // Filter berdasarkan username
        { $unwind: "$histories" }, // "Membongkar" array histories
        { $sort: { "histories.date": -1 } }, // Mengurutkan berdasarkan tanggal (terbaru ke terlama)
        { $group: { _id: "$_id", histories: { $push: "$histories" } } }, // Menggabungkan kembali array histories
        { $project: { _id: 0, histories: 1 } }, // Proyeksikan hanya field histories
      ])
      .toArray();
    return sortedHistories[0].histories; // Mengembalikan array histories
  }
}
