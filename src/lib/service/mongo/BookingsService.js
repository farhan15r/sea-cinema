import database from "@/db/mongo";
import ClientError from "@/lib/exceptions/ClientError";

export default class BookingsService {
  constructor() {
    this.userCollection = database.collection("users");
    this.bookingCollection = database.collection("bookings");
    this.movieCollection = database.collection("movies");
    this.showTimesCollection = database.collection("showTimes");
  }

  async getUserBalance(username) {}

  async getTicketPrice(movieId) {}

  async bookTicket({
    currBalance,
    totalCost,
    username,
    movieId,
    movieTitle,
    epxDate,
    seats,
    showTimeId,
  }) {
    if (currBalance < totalCost) {
      throw new ClientError("Insufficient balance");
    }

    const data = {
      username,
      movieId,
      movieTitle,
      seats,
      totalCost,
      epxDate,
      showTimeId,
    };

    const booking = await this.bookingCollection.insertOne(data);

    if (!booking) {
      throw new ClientError("Failed to book ticket");
    }
  }
}
