import database from "@/db/mongo";
import bcrypt from "bcrypt";
import ClientError from "@/lib/exceptions/ClientError";
import ServerError from "@/lib/exceptions/ServerError";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import { ObjectId } from "mongodb";

export default class ShowTimesService {
  constructor() {
    this.showTimesCollection = database.collection("showTimes");
  }

  async getDates({ movieId }) {
    // await this.dummy();

    const currDate = new Date();

    const dates = await this.showTimesCollection.distinct("date", {
      movieId,
      expDate: { $gte: currDate },
    });

    if (!dates.length) {
      throw new NotFoundError("Dates not found");
    }
    return dates;
  }

  async getTimes({ movieId, date }) {
    const currDate = new Date();

    const times = await this.showTimesCollection.distinct("time", {
      movieId,
      date,
      expDate: { $gte: currDate },
    });

    if (!times.length) {
      throw new NotFoundError("Times not found");
    }
    return times;
  }

  async getExpDate({ movieId, date, time }) {
    const showTime = await this.showTimesCollection.findOne({
      movieId,
      date,
      time,
    });

    if (!showTime) {
      throw new NotFoundError("Show time not found");
    }

    return showTime.expDate;
  }

  async getShowTimeId({ movieId, date, time }) {
    const showTime = await this.showTimesCollection.findOne({
      movieId,
      date,
      time,
    });

    if (!showTime) {
      throw new NotFoundError("Show time not found");
    }

    return showTime._id.toString();
  }

  async updateSeats({ showTimeId, seats, isBooked }) {
    const showTime = await this.showTimesCollection.findOne({
      _id: new ObjectId(showTimeId),
    });

    if (!showTime) {
      throw new NotFoundError("Show time not found");
    }

    const newSeats = showTime.seats.map((seat) => {
      if (seats.includes(seat.number)) {
        return {
          number: seat.number,
          isBooked,
        };
      } else {
        return seat;
      }
    });

    const updatedShowTime = await this.showTimesCollection.updateOne(
      { _id: new ObjectId(showTimeId) },
      { $set: { seats: newSeats } }
    );

    if (!updatedShowTime) {
      throw new ClientError("Failed to update seats");
    }
  }

    async dummy() {
      const movieId = "64a35f0a6c97f98b6021397c";
      const date = "2023-07-15";
      const time = "15:00";
      const expDate = new Date(`${date}T${time}:00.000Z`);
      const seats = [];
      for (let i = 1; i <= 64; i++) {
        seats.push({
          number: i,
          isBooked: false,
        });
      }

      const showTime = {
        movieId,
        date,
        time,
        expDate,
        seats,
      };
  await this.showTimesCollection.insertOne(
        showTime
      );
    }
}
