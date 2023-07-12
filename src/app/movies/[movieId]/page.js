"use client";

import BookingTicket from "@/components/movie/BookingTicket";
import MovieDetail from "@/components/movie/MovieDetail";
import MovieDetailLoading from "@/components/movie/MovieDetailLoading";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [LoadingMovie, setLoadingMovie] = useState(true);
  const [movie, setMovie] = useState({});
  const { movieId } = params;

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
          <BookingTicket movie={movie} />
        </>
      )}
    </main>
  );
}
