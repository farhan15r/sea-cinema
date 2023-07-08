import Image from "next/image";

export default function MovieDetail({ movie }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
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
      </div>

      <div className="flex flex-col justify-start gap-2 my-auto">
        <h2 className="text-3xl font-bold">{movie.title}</h2>
        <span className="text-xs">Release: {movie.release_date}</span>
        <p className="text-base">{movie.description}</p>
        <div className="flex gap-2 items-center">
          <span className="bg-accent rounded-xl text-black px-4 w-fit">
            Rp{movie.ticket_price.toLocaleString("id-ID")}
          </span>
          <span className="bg-primary rounded-full text-white px-2 py-1 text-xs">
            Age: {movie.age_rating}+
          </span>
        </div>
      </div>
    </div>
  );
}
