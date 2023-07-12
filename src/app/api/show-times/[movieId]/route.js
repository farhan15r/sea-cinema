import ShowTimesService from "@/lib/service/mongo/ShowTimesService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { movieId } = params;

    const showTimesService = new ShowTimesService();

    const dates = await showTimesService.getDates({ movieId });

    return NextResponse.json(dates);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
