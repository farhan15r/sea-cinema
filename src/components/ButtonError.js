export default function ButtonError({ children, loading, onClick }) {
  return (
    <button
      className="btn btn-error"
      {...(loading && { disabled: true })}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
