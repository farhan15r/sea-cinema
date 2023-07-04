import SeatsService from "@/lib/service/mongo/SeatsService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { movieId, date, time } = params;

  const seatsService = new SeatsService();


  try {
    const seats = await seatsService.getSeats({ movieId, date, time });

    return NextResponse.json(seats);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: error.status  });s
  }
}
