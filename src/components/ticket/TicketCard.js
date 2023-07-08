import axiosJWT from "@/app/utils/axiosJWT";
import ButtonError from "../ButtonError";
import { useState } from "react";
import Toast from "../Toast";

export default function TicketCard({ ticket, fetchData, setToast }) {
  const [ticketLoading, setTicketLoading] = useState(false);

  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { hour: "numeric", minute: "numeric" };

  const withDrawAction = async () => {
    try {
      setTicketLoading(true);
      const response = await axiosJWT.put(`/api/bookings/${ticket._id}`);
      if (response.status === 200) {
        fetchData();
        setTicketLoading(false);
        setToast({
          type: "success",
          message: response.data.message,
        });
      }
    } catch (error) {
      setTicketLoading(false);
      setToast({
        type: "error",
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className="card bg-base-200 shadow-xl my-6">
      <div className="card-body">
        <h2 className="card-title">{ticket.movieTitle}</h2>
        <div className="flex flex-row justify-between flex-wrap">
          <span className="text-sm">
            <p>Seats: {ticket.seats.join(", ")}</p>{" "}
          </span>
          <span className="text-sm">
            {new Date(ticket.expDate).toLocaleString("id-ID", dateOptions)} -{" "}
            {new Date(ticket.expDate).toLocaleString("id-ID", timeOptions)}
          </span>
        </div>
        <div className="flex flex-row justify-between flex-wrap items-center">
          <p>Price: Rp{ticket.totalCost}</p>
          <ButtonError onClick={withDrawAction} loading={ticketLoading}>
            Withdraw
          </ButtonError>
        </div>
      </div>
    </div>
  );
}
