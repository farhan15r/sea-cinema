import MoviesService from "@/lib/service/mongo/MoviesService";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  const moviesService = new MoviesService();
  const { movieId } = params;

  try {
    const movie = await moviesService.getMovieById(movieId);

    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
