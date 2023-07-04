import database from "@/db/mongo";
import ServerError from "@/lib/exceptions/ServerError";

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
}