import BookingsService from "@/lib/service/mongo/BookingsService";
import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { headers } = request;
    const { bookingId } = params;
    const token = TokenManager.getTokenFromHeaders(headers);

    const bookingsService = new BookingsService();
    const { username } = TokenManager.verifyAccessToken(token);
    await bookingsService.withdrawBooking(bookingId, username);

    return NextResponse.json(
      { message: "Success withdraw ticket" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: error.status || 500 }
    );
  }
}
