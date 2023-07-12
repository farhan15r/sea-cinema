import axiosJWT from "@/app/utils/axiosJWT";
import tokenUtils from "@/app/utils/tokenUtils";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingDots from "../LoadingDots";
import Toast from "../Toast";
import ButtonAccent from "../ButtonAccent";

export default function BookingTicket({ movie }) {
  const movieId = movie._id;
  const [toast, setToast] = useState(null);
  const [login, setLogin] = useState(false);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [LoadingShowTime, setLoadingShowTime] = useState(true);
  const [loadingBooking, setLoadingBooking] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setLogin(tokenUtils.isLogin());
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
  }, [selectedTime, selectedDate]);

  const fetchDatesData = async () => {
    try {
      const resultDates = await axios.get(`/api/show-times/${movieId}`);
      const dates = resultDates.data;
      setDates(dates);
      setSelectedDate(dates[0]);
    } catch (error) {
      setLoadingShowTime(false);
    }
  };

  const fetchTimesData = async () => {
    try {
      const resultTimes = await axios.get(
        `/api/show-times/${movieId}/${selectedDate}`
      );
      const times = resultTimes.data;
      setTimes(times);
      setSelectedTime(times[0]);
    } catch (error) {
      setLoadingShowTime(false);
    }
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
    setLoadingShowTime(false);
  };

  function handleSeatClick(seatNumber) {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length >= 6) {
        return;
      }
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  }

  const handleBookTicket = async () => {
    setLoadingBooking(true);
    const data = {
      movieId,
      date: selectedDate,
      time: selectedTime,
      seats: selectedSeats,
    };

    try {
      const response = await axiosJWT.post("/api/bookings", data);
      const { message } = response.data;

      setToast({
        type: "success",
        message,
      });
      fetchSeatsData();
    } catch (error) {
      const { message } = error.response.data;

      setToast({
        type: "error",
        message,
      });
    }
    setLoadingBooking(false);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <>
      {LoadingShowTime ? (
        <div className="my-16">
          <LoadingDots />
        </div>
      ) : !seats.length ? (
        <h3 className="text-xl font-bold text-center my-16">
          We are sorry, there is no show time available
        </h3>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold mt-8 mb-4">Select Your Seat</h3>
            <div className="text-center">
              <div className="border-base-300 bg-base-200 rounded-md border-2 m-2">
                <span className="col-span-1">Screen</span>
              </div>
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

            {login ? (
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
                    <ButtonAccent
                      onClick={handleBookTicket}
                      disabled={selectedSeats.length === 0}
                      loading={loadingBooking}
                    >
                      Book Ticket
                    </ButtonAccent>
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
      )}
      {toast && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}
