import database from "@/db/mongo";
import ClientError from "@/lib/exceptions/ClientError";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import { ObjectId } from "mongodb";

export default class BookingsService {
  constructor() {
    this.userCollection = database.collection("users");
    this.bookingCollection = database.collection("bookings");
    this.movieCollection = database.collection("movies");
    this.showTimesCollection = database.collection("showTimes");
  }

  async bookTicket({
    currBalance,
    totalCost,
    username,
    movieId,
    movieTitle,
    expDate,
    seats,
    showTimeId,
    ageRating,
    userAge,
  }) {
    if (userAge < ageRating) {
      throw new ClientError("You are not old enough to watch this movie");
    }

    if (currBalance < totalCost) {
      throw new ClientError("Insufficient balance");
    }

    const data = {
      username,
      movieId,
      movieTitle,
      seats,
      totalCost,
      expDate,
      showTimeId,
    };

    const booking = await this.bookingCollection.insertOne(data);

    if (!booking) {
      throw new ClientError("Failed to book ticket");
    }
  }

  async getBookingTickets(username) {
    const currDate = new Date();

    const bookingTickets = await this.bookingCollection.find({
      username,
      expDate: { $gte: currDate },
      $or: [
        { isWithdrawn: false },
        { isWithdrawn: { $exists: false } }
      ],
    },
    ).toArray();

    return bookingTickets;
  }

  async getBookingDetails(bookingId) {
    const booking = await this.bookingCollection.findOne({
      _id: new ObjectId(bookingId),
    });

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    return booking;
  }

  async withdrawBooking(bookingId) {
    const result = await this.bookingCollection.updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: { isWithdrawn: true } }
    )

    if (!result.acknowledged) {
      throw new ClientError("Failed to withdraw booking");
    }

    return;
  }
}
