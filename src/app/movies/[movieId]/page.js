"use client";

import axiosJWT from "@/app/utils/axiosJWT";
import tokenUtils from "@/app/utils/tokenUtils";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home({ params }) {
  const [isLogin, setIsLogin] = useState(false);
  const [movie, setMovie] = useState({});
  const { movieId } = params;
  const [showTime, setShowTime] = useState(false);
  const [seats, setSeats] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setIsLogin(tokenUtils.isLogin());
    fetchMovieData();
    fetchDatesData();
  }, [movieId]);

  useEffect(() => {
    if (selectedDate) {
      fetchTimesData();
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      fetchSeatsData();
    }
  }, [selectedTime]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBookTicket = async () => {
    const data = {
      movieId,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
    };

    try {
      const response = await axiosJWT.post("/api/bookings", data);
      const { message } = response.data;
      setStatus("success");
      setMessage(message);
    }catch (error) {
      const { message } = error.response.data;
      setStatus("failed");
      setMessage(message);
    } finally {

      window.statusModal.showModal();
    }
  };

  const fetchMovieData = async () => {
    try {
      const resultMovie = await axios.get(`/api/movies/${movieId}`);
      const movie = resultMovie.data;
      movie.ticketPriceStr = `Rp${movie.ticket_price.toLocaleString("id-ID")}`;
      setMovie(movie);
    } catch (error) {}
  };

  const fetchDatesData = async () => {
    try {
      const resultDates = await axios.get(`/api/show-times/${movieId}`);
      const dates = resultDates.data;
      setDates(dates);
      setSelectedDate(dates[0]);
    } catch (error) {}
  };

  const fetchTimesData = async () => {
    try {
      const resultTimes = await axios.get(
        `/api/show-times/${movieId}/${selectedDate}`
      );
      const times = resultTimes.data;
      setTimes(times);
      setSelectedTime(times[0]);
    } catch (error) {}
  };

  const fetchSeatsData = async () => {
    try {
      const resultSeats = await axios.get(
        `/api/seats/${movieId}/${selectedDate}/${selectedTime}`
      );
      const seats = resultSeats.data;

      setSeats(seats);
      setSelectedSeats([]);
      setShowTime(true);
    } catch (error) {}
  };

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
      <dialog id="statusModal" className="modal" onClick={() => window.location.reload()}>
        <form method="dialog" className={`modal-box border-2 ${status == 'success' ? 'border-success' : 'border-error' }`}>
          <h3 className="font-bold text-lg">{status}!</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => window.location.reload()}>
              Close
            </button>
          </div>
        </form>
      </dialog>
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
      </div>

      {showTime ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold mt-8 mb-4">Select Your Seat</h3>
            <div className="text-center">
              <div className="border-base-300 bg-base-200 rounded-md border-2 m-2">
                <span className="col-span-1">Screen</span>
              </div>
              <div className="grid grid-cols-8 gap-2">
                {seats &&
                  seats.map((seat) => (
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
          <div className="flex flex-col mt-8 gap-4 justify-between">
            <div>
              <h3 className="text-xl font-bold">Select Date & Time</h3>
              <div>
                <div>
                  <label htmlFor="date" className="label">
                    Date:
                  </label>
                  <select
                    id="date"
                    className="select select-accent w-full max-w-xs"
                    value={selectedDate}
                    onChange={handleDateChange}
                  >
                    {dates &&
                      dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="time" className="label">
                    Time:
                  </label>
                  <select
                    id="time"
                    className="select select-accent w-full max-w-xs"
                    value={selectedTime}
                    onChange={handleTimeChange}
                  >
                    {times &&
                      times.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>

            {isLogin ? (
              <div>
                <h3 className="text-xl font-bold">Book Your Ticket</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-base">Ticket Price</span>
                    <span className="text-base">{movie.ticketPriceStr}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base">Seat(s)</span>
                    <span className="text-base">
                      {selectedSeats.length > 0
                        ? selectedSeats.join(", ")
                        : "No seat selected"}
                    </span>

                    <span className="text-base">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base">Total</span>
                    <span className="text-base">
                      {selectedSeats.length > 0
                        ? `Rp${(
                            selectedSeats.length * movie.ticket_price
                          ).toLocaleString()}`
                        : "Rp0"}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="btn btn-accent"
                      onClick={handleBookTicket}
                      disabled={selectedSeats.length === 0}
                    >
                      Book Ticket
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <h4 className="text-xl font-bold text-center mt-5">
                Please login to book ticket
              </h4>
            )}
          </div>
        </div>
      ) : (
        <h3 className="text-xl font-bold text-center mt-5">
          We are sorry, there is no show time available
        </h3>
      )}
    </main>
  );
}
