import axiosJWT from "@/app/utils/axiosJWT";
import { useEffect, useState } from "react";
import TicketCard from "@/components/ticket/TicketCard";
import LoadingDots from "@/components/LoadingDots";
import Toast from "../Toast";

export default function MyTicketModal({ isOpen, onClose }) {
  const [toast, setToast] = useState(null);
  const [ticketsLoading, setTicketsLoading] = useState(true);
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
      setTicketsLoading(false);
    } catch (error) {
      setTicketsLoading(false);
      setToast({
        type: "error",
        message: error.response.data,
      });
    }
  };

  return (
    <>
      <dialog
        id="balance-modal"
        className="modal"
        onClick={() => onClose()}
        open
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <h3 className="font-bold text-lg">Your tickets</h3>
          {ticketsLoading ? (
            <LoadingDots />
          ) : tickets.length === 0 ? (
            <p className="text-center">No tickets found</p>
          ) : (
            <div className="max-h-[50vh] max-w-full mb-5 overflow-y-scroll">
              {tickets.map((ticket, i) => (
                <TicketCard
                  key={i}
                  ticket={ticket}
                  fetchData={fetchData}
                  setToast={setToast}
                />
              ))}
            </div>
          )}

          <div className="flex justify-end">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
      {toast && <Toast toast={toast} setToast={setToast} />}
    </>
  );
}
