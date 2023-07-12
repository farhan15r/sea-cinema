export default function ButtonAccent({ children, loading, disabled, onClick }) {
  return (
    <button
      className="btn btn-accent"
      disabled={loading || disabled}
      onClick={onClick}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
