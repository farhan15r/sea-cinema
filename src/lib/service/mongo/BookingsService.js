import database, { client } from "@/db/mongo";
import ClientError from "@/lib/exceptions/ClientError";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import ServerError from "@/lib/exceptions/ServerError";
import { ObjectId } from "mongodb";

export default class BookingsService {
  constructor() {
    this.transactionOptions = {
      readConcern: { level: "majority" },
      writeConcern: { w: "majority" },
      readPreference: "primary",
    };

    this.userCollection = database.collection("users");
    this.bookingCollection = database.collection("bookings");
    this.movieCollection = database.collection("movies");
    this.showTimesCollection = database.collection("showTimes");
  }

  async bookingTicket({ username, movieId, date, time, seats }) {
    const session = client.startSession(this.transactionOptions);
    try {
      session.startTransaction();

      const user = await this.userCollection.findOne({ username });
      const movie = await this.movieCollection.findOne({
        _id: new ObjectId(movieId),
      });
      const showTime = await this.showTimesCollection.findOne({
        movieId,
        date,
        time,
      });
      const description = `${movie.title} | ${date}-${time} | [${seats}]`;
      const totalCost = movie.ticket_price * seats.length;

      if (movie.age_rating > user.age) {
        throw new ClientError("You are not old enough to watch this movie");
      }

      if (user.balance < totalCost) {
        throw new ClientError("Insufficient balance");
      }

      await this.bookingCollection.insertOne(
        {
          username,
          movieId,
          movieTitle: movie.title,
          seats,
          totalCost,
          expDate: showTime.expDate,
          showTimeId: showTime._id.toString(),
        },
        { session }
      );

      await this.userCollection.updateOne(
        { username },
        {
          $inc: { balance: -totalCost },
          $push: {
            histories: {
              type: "out",
              amount: totalCost,
              description,
              date: new Date(),
            },
          },
        },
        { session }
      );

      const newSeats = showTime.seats.map((seat) => {
        if (seats.includes(seat.number)) {
          return {
            number: seat.number,
            isBooked: true,
          };
        } else return seat;
      });

      await this.showTimesCollection.updateOne(
        { _id: showTime._id },
        { $set: { seats: newSeats } },
        { session }
      );

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();

      if (error instanceof ClientError) {
        throw error;
      }

      throw new ServerError("Failed to book ticket");
    }
  }

  async getBookingTickets(username) {
    const currDate = new Date();

    const bookingTickets = await this.bookingCollection
      .find({
        username,
        expDate: { $gte: currDate },
        $or: [{ isWithdrawn: false }, { isWithdrawn: { $exists: false } }],
      })
      .toArray();

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

  async withdrawBooking(bookingId, username) {
    const session = client.startSession(this.transactionOptions);
    try {
      session.startTransaction();

      const booking = await this.bookingCollection.findOne({
        _id: new ObjectId(bookingId),
      });

      const showTime = await this.showTimesCollection.findOne({
        _id: new ObjectId(booking.showTimeId),
      });
      const description = `${booking.movieTitle} | ${booking.expDate} | [${booking.seats}]`;

      const newSeats = showTime.seats.map((seat) => {
        if (booking.seats.includes(seat.number))
          return {
            number: seat.number,
            isBooked: false,
          };
        else return seat;
      });

      await this.bookingCollection.updateOne(
        { _id: new ObjectId(bookingId) },
        { $set: { isWithdrawn: true } },
        { session }
      );

      await this.showTimesCollection.updateOne(
        { _id: new ObjectId(booking.showTimeId) },
        { $set: { seats: newSeats } },
        { session }
      );

      await this.userCollection.updateOne(
        { username },
        {
          $inc: { balance: +booking.totalCost },
          $push: {
            histories: {
              type: "in",
              amount: booking.totalCost,
              description,
              date: new Date(),
            },
          },
        },
        { session }
      );

      await session.commitTransaction();
      await session.endSession();
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();

      if (error instanceof ClientError) {
        throw error;
      }
      throw new ServerError("Failed to withdraw booking");
    }
  }
}
