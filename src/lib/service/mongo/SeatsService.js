import database from "@/db/mongo";
import bcrypt from "bcrypt";
import ClientError from "@/lib/exceptions/ClientError";
import ServerError from "@/lib/exceptions/ServerError";
import NotFoundError from "@/lib/exceptions/NotFoundError";

export default class SeatsService {
  constructor() {
    this.showTimesCollection = database.collection("showTimes");
  }

  async getSeats({ movieId, date, time }) {
    const {seats} = await this.showTimesCollection.findOne({ movieId, date, time });

    if (!seats) {
      throw new NotFoundError("Seats not found");
    }
    return seats;
  }
}
