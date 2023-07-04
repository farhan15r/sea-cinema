"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [movie, setMovie] = useState({});
  const { movieId } = params;
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resultMovie = await axios.get(`/api/movies/${movieId}`);
        const movie = resultMovie.data;
        movie.ticketPriceStr = `Rp${movie.ticket_price.toLocaleString(
          "id-ID"
        )}`;
        setMovie(movie);

        const resultSeats = await axios.get(
          `/api/seats/${movieId}/05-07-2023/09:00`
        );
        const seats = resultSeats.data;

        setSeats(seats);
      } catch (error) {
        // Handle error
      }
    }

    fetchData();
  }, [movieId]);

  function handleSeatClick(seatNumber) {
    // Toggle seat selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      // max 6 seats
      if (selectedSeats.length >= 6) {
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

  return (
    <main className="container my-10 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="card bg-base-100 shadow-md shadow-slate-400 overflow-hidden">
          <figure className="relative">
            <Image
              src={movie.poster_url}
              alt={`${movie.title}`}
              width={150}
              height={300}
              layout="responsive"
            />
          </figure>
        </div>

        <div className="flex flex-col justify-start gap-2 my-auto">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <span className="text-xs">Release: {movie.release_date}</span>
          <p className="text-base">{movie.description}</p>
          <div className="flex gap-2 items-center">
            <span className="bg-accent rounded-xl text-black px-4 w-fit">
              {movie.ticketPriceStr}
            </span>
            <span className="bg-primary rounded-full text-white px-2 py-1 text-xs">
              Age: {movie.age_rating}+
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold mt-8 mb-4">Select Your Seat</h3>
          <div className="text-center">
            <span className="col-span-1">Screen</span>
            <div className="grid grid-cols-8 gap-2">
              {seats.map((seat) => (
                <div
                  key={seat.number}
                  className={`py-2 ${
                    selectedSeats.includes(seat.number)
                      ? "bg-accent text-white rounded-md cursor-pointer"
                      : seat.isBooked
                      ? "bg-red-500 text-white rounded-md disabled"
                      : "bg-base-200 border-accent border-2 rounded-md cursor-pointer"
                  }`}
                  onClick={
                    !seat.isBooked
                      ? () => handleSeatClick(seat.number)
                      : undefined
                  }
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
