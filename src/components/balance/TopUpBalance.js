import ButtonAccent from "@/components/ButtonAccent";

export default function TopUpBalance({ updateBalance, updateBalanceLoading }) {
  const topUpAction = async (e) => {
    e.preventDefault();
    const topUpAmount = parseInt(document.getElementById("topup-amount").value);
    const topUpMethod = document.getElementById("topup-method").value;

    updateBalance({
      amount: topUpAmount,
      type: "topup",
      method: topUpMethod,
    });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2">
      <input type="radio" name="my-accordion-2" checked="checked" />
      <div className="collapse-title text-xl font-medium min-w-0">Top Up</div>
      <div className="collapse-content min-w-0">
        <form onSubmit={topUpAction}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              id="topup-amount"
              type="number"
              defaultValue="0"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Payment Method</span>
            </label>
            <select className="select select-bordered w-full" id="topup-method">
              <option value="GoPay">GoPay</option>
              <option value="OVO">OVO</option>
              <option value="Dana">Dana</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <ButtonAccent loading={updateBalanceLoading}>Top Up</ButtonAccent>
          </div>
        </form>
      </div>
    </div>
  );
}
