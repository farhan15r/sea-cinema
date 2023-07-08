export default function MovieDetailLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <div className="card shadow-md shadow-slate-400 bg-base-200 overflow-hidden animate-pulse">
          <figure className="relative w-full h-[80vh] sm:h-[1000px] md:h-[520px]"></figure>
        </div>
      </div>

      <div className="flex flex-col justify-start gap-2 my-auto">
        <h2 className="text-3xl font-bold bg-base-200 w-3/6 animate-pulse h-9"></h2>
        <span className="text-xs bg-base-200 w-32 h-4 animate-pulse"></span>
        <p className="text-base bg-base-200 w-28 h-6 animate-pulse"></p>
        <div className="flex gap-2 items-center">
          <span className="bg-base-200 rounded-xl text-black w-24 h-6 animate-pulse"></span>
          <span className="bg-base-200 rounded-full text-white h-6 w-16 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
}
