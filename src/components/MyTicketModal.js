import axiosJWT from "@/app/utils/axiosJWT";
import { useEffect, useState } from "react";
import TicketCard from "@/components/TicketCard";

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
            tickets.map((ticket, i) => (
              <TicketCard key={i} ticket={ticket} onReload={() => fetchData()} />
            ))}
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
