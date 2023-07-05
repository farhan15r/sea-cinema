import database from "@/db/mongo";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import { ObjectId } from "mongodb";

export default class MoviesService {
  constructor() {
    this.moviesCollection = database.collection("movies");
  }

  async getMovies() {
    const movies = await this.moviesCollection.find({}).toArray();

    return movies;
  }

  async getMovieById(movieId) {
    const movie = await this.moviesCollection.findOne({
      _id: new ObjectId(movieId),
    });

    if (!movie) {
      throw new NotFoundError("Movie not found");
    }

    return movie;
  }

  async getTicketsPrice(movieId) {
    const movie = await this.moviesCollection.findOne({
      _id: new ObjectId(movieId),
    });

    if (!movie) {
      throw new NotFoundError("Movie not found");
    }

    return movie.ticket_price;
  }

  async getMovieTitle(movieId) {
    const movie = await this.moviesCollection.findOne({
      _id: new ObjectId(movieId),
    });

    if (!movie) {
      throw new NotFoundError("Movie not found");
    }

    return movie.title;
  }
}
