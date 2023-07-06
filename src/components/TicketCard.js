import axiosJWT from "@/app/utils/axiosJWT";

export default function TicketCard({ticket, onReload}) {
  const dateOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const timeOptions = { hour: "numeric", minute: "numeric" };

  const withDrawAction = async () => {  
    try {
      const response = await axiosJWT.put(`/api/bookings/${ticket._id}`);
      if (response.status === 200) {
        onReload();
      }
    } catch (error) {}
  }

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
          <button className="btn btn-error btn-sm" onClick={withDrawAction}>Withdraw</button>
        </div>
      </div>
    </div>
  );
}
