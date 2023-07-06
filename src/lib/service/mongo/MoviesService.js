import database from "@/db/mongo";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import { ObjectId } from "mongodb";
import movies from "./dummy/movies";

export default class MoviesService {
  constructor() {
    this.dummyMovies = movies;
    this.moviesCollection = database.collection("movies");
  }

  async getMovies() {
    // this.dummy();
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

  async dummy() {
    const movies = this.dummyMovies;

    await this.moviesCollection.insertMany(movies);
  }
}
