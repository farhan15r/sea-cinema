import { AiOutlineClose } from "react-icons/ai";

export default function Toast({ toast, setToast }) {
  return (
    <div className="toast toast-end z-[9999]">
      <div className={`alert ${
        toast.type === "success" ? "alert-success" : 
        toast.type === "error" ? "alert-error" :
        "alert-warning"
      } justify-start grid-flow-col`}>
        <span>{toast.message}</span>
        <button className={`btn btn-sm ml-2 ${
          toast.type === "success" ? "btn-success" :
          toast.type === "error" ? "btn-error" :
          "btn-warning"
        }`}
          onClick={() => setToast(null)}
        >
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}
