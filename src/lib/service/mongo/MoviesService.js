import database from "@/db/mongo";
import NotFoundError from "@/lib/exceptions/NotFoundError";
import ServerError from "@/lib/exceptions/ServerError";
import { ObjectId } from "mongodb";

export default class MoviesService {
  constructor() {
    this.moviesCollection = database.collection("movies");
  }

  async getMovies() {
    try {
      const movies = await this.moviesCollection.find({}).toArray();

      return movies;
    } catch (error) {
      throw new ServerError("Failed to get movies");
    }
  }

  async getMovieById(movieId) {
    try {
      const movie = await this.moviesCollection.findOne({ _id: new ObjectId(movieId) });

      if (!movie) {
        throw new NotFoundError("Movie not found");
      }

      return movie;
    } catch (error) {
      
    }
  }
}