import MoviesService from "@/lib/service/mongo/MoviesService";
import { NextResponse } from "next/server";

export async function GET() {
  const moviesService = new MoviesService();

  try {
    const movies = await moviesService.getMovies();

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status  });s
  }
}
