"use client";

import axios from "axios";
import { useEffect, useState } from "react";

function BalanceModal({ isOpen, onClose, onHistoryClick }) {
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      return null;
    }

    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axios.get("/api/balance", config);
        const { balance } = response.data;

        setCurrentBalance(balance);
      } catch (error) {
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  async function topUpAction(e) {
    e.preventDefault();
    const topUpAmount = parseInt(document.getElementById("topup-amount").value);
    const topUpMethod = document.getElementById("topup-method").value;

    const accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.put(
      "/api/balance",
      {
        amount: topUpAmount,
        type: "topup",
        method: topUpMethod,
      },
      config
    );

    const newBalance = response.data.balance;
    setCurrentBalance(newBalance);
  }

  async function withdrawAction(e) {
    e.preventDefault();
    const withdrawAmount = parseInt(
      document.getElementById("withdraw-amount").value
    );
    const withdrawMethod = document.getElementById("withdraw-method").value;

    const accessToken = localStorage.getItem("accessToken");

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await axios.put(
      "/api/balance",
      {
        amount: withdrawAmount,
        type: "withdraw",
        method: withdrawMethod,
      },
      config
    );

    const newBalance = response.data.balance; 

    setCurrentBalance(newBalance);
  }

  return (
    <dialog id="balance-modal" className="modal" onClick={() => onClose()} open>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="font-bold text-lg">Balance</h3>
        <p className="py-4">
          Your balance is <span className="font-bold">{currentBalance}</span>
        </p>

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
                  defaultValue="10000"
                  min={10000}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <label className="label">
                  <span className="label-text">Payment Method</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  id="topup-method"
                >
                  <option value="GoPay">GoPay</option>
                  <option value="OVO">OVO</option>
                  <option value="Dana">Dana</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-accent btn-md ml-auto">
                  Top Up
                </button>
              </div>
            </form>
          </div>
        </div>
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
                  defaultValue="10000"
                  min={10000}
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
                <button className="btn btn-accent btn-md ml-auto">
                  Withdraw
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex justify-between">
          <button className="btn btn-accent" onClick={() => onHistoryClick()}>
            History
          </button>
          <button className="btn btn-secondary" onClick={() => onClose()}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default BalanceModal;
