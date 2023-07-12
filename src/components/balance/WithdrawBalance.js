import ButtonAccent from "@/components/ButtonAccent";

export default function WithdrawBalance({
  updateBalance,
  updateBalanceLoading,
}) {
  const withdrawAction = async (e) => {
    e.preventDefault();
    const withdrawAmount = parseInt(
      document.getElementById("withdraw-amount").value
    );
    const withdrawMethod = document.getElementById("withdraw-method").value;

    updateBalance({
      amount: withdrawAmount,
      type: "withdraw",
      method: withdrawMethod,
    });
  };

  return (
    <div className="collapse collapse-arrow bg-base-200 mb-2">
      <input type="radio" name="my-accordion-2" />
      <div className="collapse-title text-xl font-medium min-w-0">Withdraw</div>
      <div className="collapse-content min-w-0">
        <form onSubmit={withdrawAction}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <input
              id="withdraw-amount"
              type="number"
              defaultValue="0"
              className="input input-bordered"
            />
          </div>
          <div className="form-control mt-6">
            <label className="label">
              <span className="label-text">Payment Method</span>
            </label>
            <select
              className="select select-bordered w-full"
              id="withdraw-method"
            >
              <option value="GoPay">GoPay</option>
              <option value="OVO">OVO</option>
              <option value="Dana">Dana</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <ButtonAccent loading={updateBalanceLoading}>Withdraw</ButtonAccent>
          </div>
        </form>
      </div>
    </div>
  );
}
