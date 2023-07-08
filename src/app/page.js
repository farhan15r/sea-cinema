"use client";

import MovieCard from "@/components/home/MovieCard";
import MovieCardLoading from "@/components/home/MovieCardLoading";
import Toast from "@/components/Toast";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [toast, setToast] = useState(null);
  const [moviesLoading, setMoviesLoading] = useState(true);

  useEffect(() => {
    fetchMoviesData();
  }, []);

  async function fetchMoviesData() {
    try {
      const result = await axios.get("/api/movies");
      setMovies(result.data);
      setMoviesLoading(false);
    } catch (error) {
      setToast({
        type: "error",
        message: error.message,
      });
    }
  }

  return (
    <main>
      <div className="flex bg-base-200 w-full">
        <div className="container p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {moviesLoading ? (
            <MovieCardLoading />
          ) : (
            movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
          )}
        </div>
      </div>

      {toast && <Toast toast={toast} setToast={setToast} />}
    </main>
  );
}
