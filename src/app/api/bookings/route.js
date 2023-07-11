import BookingsService from "@/lib/service/mongo/BookingsService";
import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.json();
  const { movieId, date, time, seats } = req;
  const { headers } = request;

  const token = TokenManager.getTokenFromHeaders(headers);
  
  const bookingsService = new BookingsService();
  
  try {
    const { username } = TokenManager.verifyAccessToken(token);
    await bookingsService.bookingTicket({ username, movieId, date, time, seats });

    return NextResponse.json(
      { message: "success booking ticket" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}

export async function GET({headers}) {
  const token = TokenManager.getTokenFromHeaders(headers);
  
  const bookingsService = new BookingsService();
  
  try {
    const { username } = TokenManager.verifyAccessToken(token);
    const bookingTickets = await bookingsService.getBookingTickets(username);

    return NextResponse.json(
       bookingTickets,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }

}
