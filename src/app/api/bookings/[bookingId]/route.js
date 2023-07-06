import BookingsService from "@/lib/service/mongo/BookingsService";
import ShowTimesService from "@/lib/service/mongo/ShowTimesService";
import UsersService from "@/lib/service/mongo/UsersService";
import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  // const req = await request.json();
  const { headers } = request;
  const { bookingId } = params;
  const token = TokenManager.getTokenFromHeaders(headers);
  const { username } = TokenManager.verifyAccessToken(token);

  const bookingsService = new BookingsService();
  const usersService = new UsersService();
  const showTimesService = new ShowTimesService();

  try {
    const booking = await bookingsService.getBookingDetails(bookingId);
    const currBalance = await usersService.getBalance(username);
    const description = `${booking.movieTitle} | ${booking.expDate} | [${booking.seats}]`;
    await bookingsService.withdrawBooking(bookingId, username);
    await usersService.updateBalanceBooking({
      username,
      currBalance,
      totalCost: booking.totalCost,
      description,
      type: "in",
    });
    await showTimesService.updateSeats({
      showTimeId: booking.showTimeId,
      seats: booking.seats,
      isBooked: false,
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}
