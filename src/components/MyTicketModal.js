import axiosJWT from "@/app/utils/axiosJWT";
import { useEffect, useState } from "react";

export default function MyTicketModal({ isOpen, onClose }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      return null;
    }

    fetchData();
  }, [isOpen]);

  const fetchData = async () => {
    try {
      const response = await axiosJWT.get("/api/bookings");

      setTickets(response.data);
    } catch (error) {}
  };

  return (
    <dialog id="balance-modal" className="modal" onClick={() => onClose()} open>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg">Your tickets</h3>
        <div className="max-h-[50vh] max-w-full mb-5 overflow-y-scroll">
          {tickets &&
            tickets.map((ticket, i) => {
              const dateOptions = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
              const timeOptions = { hour: "numeric", minute: "numeric" };
              return (
                <div key={i} className="card bg-base-200 shadow-xl my-6">
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
                    <p>Price: Rp{ticket.totalCost}</p>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-end">
          <button className="btn btn-secondary" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}
