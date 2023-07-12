import MoviesService from "@/lib/service/mongo/MoviesService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const moviesService = new MoviesService();
    const { movieId } = params;

    const movie = await moviesService.getMovieById(movieId);

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
