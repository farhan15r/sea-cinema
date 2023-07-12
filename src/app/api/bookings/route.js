import BookingsService from "@/lib/service/mongo/BookingsService";
import TokenManager from "@/lib/tokenize/TokenManager";
import BookingValidator from "@/lib/validator/booking";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const { headers } = request;

    const bookingsService = new BookingsService();
    const bookingValidator = new BookingValidator();

    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);

    bookingValidator.validatePostBooking(payload);
    const { movieId, date, time, seats } = payload;
    await bookingsService.bookingTicket({
      username,
      movieId,
      date,
      time,
      seats,
    });

    return NextResponse.json(
      { message: "success booking ticket" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}

export async function GET({ headers }) {
  const bookingsService = new BookingsService();

  try {
    const token = TokenManager.getTokenFromHeaders(headers);
    const { username } = TokenManager.verifyAccessToken(token);

    const bookingTickets = await bookingsService.getBookingTickets(username);

    return NextResponse.json(bookingTickets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
