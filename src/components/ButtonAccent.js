export default function ButtonAccent({ children, loading }) {
  return (
    <button className="btn btn-accent" {...(loading && { disabled: true })}>
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
}
