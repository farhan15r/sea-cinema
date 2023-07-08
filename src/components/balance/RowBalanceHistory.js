export default function RowBalanceHistory({ history }) {
  const { type, amount, description, date } = history;
  const typeClass = type === "out" ? "text-error" : "text-success";
  const amountStr = convertAmountStr(amount, type);

  function convertAmountStr(amount, type) {
    const amountStr = amount.toLocaleString("id-ID");

    if (type === "in") {
      return `+Rp${amountStr}`;
    } else if (type === "out") {
      return `-Rp${amountStr}`;
    }
  }

  return (
    <tr>
      <td className="flex flex-col">
        <div className="flex flex-row justify-between items-center">
        <p className={`${typeClass} md:text-lg`}>{amountStr}</p>

          <div className="flex">
            <span className="badge badge-ghost badge-sm">
              {new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          </div>
        </div>
        <span className="badge badge-ghost badge-md h-fit">{description}</span>
      </td>
    </tr>
  );
}
