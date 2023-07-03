import Image from "next/image";

export default function MovieCard({ movie }) {
  return (
    <div className="card bg-base-100 shadow-md shadow-slate-400">
      <figure className="relative">
        <Image
          src={`${movie.poster_url}`}
          alt={`${movie.title}`}
          width={150}
          height={300}
          layout="responsive"
        />
        <div className="badge font-bold text-black badge-accent absolute bottom-0 right-0 rounded-r-none">
          {movie.age_rating}+
        </div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-base md:text-lg">{movie.title}</h2>
        <div className="join mt-auto w-full lg:items-center lg:flex-row flex-col content-start">
          <span>{movie.ticket_price_string}</span>
          <button className="btn btn-info btn-sm text-sm lg:ml-auto">
            Buy Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
