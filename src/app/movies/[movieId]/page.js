"use client";

import axiosJWT from "@/app/utils/axiosJWT";
import tokenUtils from "@/app/utils/tokenUtils";
import BookingTicket from "@/components/movie/BookingTicket";
import MovieDetail from "@/components/movie/MovieDetail";
import MovieDetailLoading from "@/components/movie/MovieDetailLoading";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [isLogin, setIsLogin] = useState(false);
  const [LoadingMovie, setLoadingMovie] = useState(true);
  const [movie, setMovie] = useState({});
  const { movieId } = params;
  const [showTime, setShowTime] = useState(false);
  const [seats, setSeats] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchMovieData();
  }, [movieId]);

  const fetchMovieData = async () => {
    try {
      const resultMovie = await axios.get(`/api/movies/${movieId}`);
      const movie = resultMovie.data;
      setMovie(movie);
      setLoadingMovie(false);
    } catch (error) {}
  };

  return (
    <main className="container my-10 max-w-3xl">
      {LoadingMovie ? (
        <MovieDetailLoading />
      ) : (
        <>
          <MovieDetail movie={movie} />
          <BookingTicket movie={movie}/>
        </>
      )}
    </main>
  );
}
