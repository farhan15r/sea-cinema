'use client'

import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import MovieCardLoading from "./MovieCardLoading";

function priceToString(price) {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function AllMovies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get("/api/movies");
        setMovies(result.data);
        setIsLoading(false);
      } catch (error) {
        if(error.response.status === 500) {
          setServerError(error.response.statusText);
        }
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {serverError && (
      <div className="alert alert-error fixed bottom-2 right-2 w-fit z-50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{serverError}</span>
      </div>
    )}
    <div className="flex bg-base-200 w-full">
      <div className="container p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading? (
          <MovieCardLoading />
        ): 
          movies.map((movie) => (
          movie.ticket_price_string = priceToString(movie.ticket_price),
          <MovieCard key={movie._id} movie={movie} />
        ))
        }
      </div>
    </div>
    </>
  );
}
