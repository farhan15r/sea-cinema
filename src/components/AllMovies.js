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

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/movies");
      setMovies(result.data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className="flex bg-base-200 w-full">
      <div className="container p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {isLoading? (
          <MovieCardLoading />
        ): 
          movies.map((movie) => (
          movie.ticket_price_string = priceToString(movie.ticket_price),
          <MovieCard key={movie.id} movie={movie} />
        ))
        }
      </div>
    </div>
  );
}
