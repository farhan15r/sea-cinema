import database from "@/db/mongo";
import NotFoundError from "@/lib/exceptions/NotFoundError";

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
    await this.showTimesCollection.insertOne(showTime);
  }
}
