import BookingsService from "@/lib/service/mongo/BookingsService";
import MoviesService from "@/lib/service/mongo/MoviesService";
import ShowTimesService from "@/lib/service/mongo/ShowTimesService";
import UsersService from "@/lib/service/mongo/UsersService";
import TokenManager from "@/lib/tokenize/TokenManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  const req = await request.json();
  const { movieId, date, time, seats } = req;
  const { headers } = request;

  const token = TokenManager.getTokenFromHeaders(headers);
  const { username, age } = TokenManager.verifyAccessToken(token);

  const usersService = new UsersService();
  const moviesService = new MoviesService();
  const bookingsService = new BookingsService();
  const showTimesService = new ShowTimesService();

  try {
    const currBalance = await usersService.getBalance(username);
    const ticketPrice = await moviesService.getTicketsPrice(movieId);
    const { title: movieTitle, age_rating: ageRating } =
      await moviesService.getMovieById(movieId);
    // const movieTitle = await moviesService.getMovieTitle(movieId);
    const expDate = await showTimesService.getExpDate({ movieId, date, time });
    const description = `${movieTitle} | ${date}-${time} | [${seats}]`;
    const showTimeId = await showTimesService.getShowTimeId({
      movieId,
      date,
      time,
    });
    const totalCost = ticketPrice * seats.length;
    await bookingsService.bookTicket({
      currBalance,
      totalCost,
      username,
      movieId,
      movieTitle,
      expDate,
      seats,
      showTimeId,
      ageRating,
      userAge: age,
    });
    await usersService.updateBalanceBooking({
      username,
      currBalance,
      totalCost,
      description,
      type: "out",
    });
    await showTimesService.updateSeats({ showTimeId, seats, isBooked: true });

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
  const { username, age } = TokenManager.verifyAccessToken(token);

  const bookingsService = new BookingsService();

  try {
    const bookingTickets = await bookingsService.getBookingTickets(username);

    console.log();

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
