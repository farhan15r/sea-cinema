import MoviesService from "@/lib/service/mongo/MoviesService";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const moviesService = new MoviesService();

    const movies = await moviesService.getMovies();

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
